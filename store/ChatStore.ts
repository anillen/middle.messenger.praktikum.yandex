import AuthService from "../services/AuthService/AuthService";
import ChatService from "../services/ChatService/ChatService";
import ChatList from "../src/pages/chats/components/left-column/components/chat-list/chat-list";
import ChatListItem from "../src/pages/chats/components/left-column/components/chat-list/components/chat-list-item/chat-list-item";
import MessageListItem from "../src/pages/chats/components/right-column/components/message-list/components/message-list-item/message-list-item";
import Block from "../utils/Block";

interface MessageModel {
  content: string;
  time: Date;
  user_id: number;
  id: number;
  type: string;
}

class ChatStore {
  public currentChatId: number | null;
  public currentUserId: number | null;
  public currentChatToken: string | null;
  public listMessages: Array<MessageListItem>;
  public listChats: Array<ChatListItem>;
  public updateListChat: boolean;

  private _socket: WebSocket | null;

  private _blocks: Map<string, Array<Block>>;

  constructor() {
    this._blocks = new Map<string, Array<Block>>();
    this._socket = null;
    this.currentChatId = null;
    this.currentUserId = null;
    this.currentChatToken = null;
    this.updateListChat = false;

    this.listMessages = new Array<MessageListItem>();
    this.listChats = new Array<ChatListItem>();

    Object.entries(this).forEach(item => {
      if (item[0].indexOf("_") != -1) {
        return;
      }

      this._blocks.set(item[0], new Array<Block>());
    });

    Object.defineProperties(this, {
      currentChatId: {
        set(value: number) {
          ChatService.getChatToken(value)
            .then(token => {
              if (token == null) {
                throw new Error();
              }
              AuthService.GetUserInfo().then(userInfo => {
                if (userInfo == null) {
                  throw new Error();
                }
                this._openSocket(value, token.token, userInfo.id);
              });
            })
            .catch(() => {
              console.error("Не удалось получить токен чата");
            });

          this._blocks.get("currentChatId").forEach((block: Block) => {
            this.listMessages = new Array<MessageListItem>();
            block.setProps({
              ...block.props,
              currentChatId: value,
              listMessages: this.listMessages,
            });
          });
        },
      },
      listChats: {
        set(value: Array<ChatListItem>) {
          this._blocks.get("listChats").forEach((block: Block) => {
            block.setProps({
              ...block.props,
              listChats: value,
            });
          });
        },
      },
      updateListChat: {
        set() {
          console.log("UPDATE");
          this._blocks.get("updateListChat").forEach((block: Block) => {
            (block as ChatList).updateChatList();
          });
        },
      },
      listMessages: {
        set(value: Array<MessageListItem>) {
          this._blocks.get("listMessages").forEach((block: Block) => {
            block.setProps({
              ...block.props,
              listMessages: value,
            });
          });
        },
      },
    });
  }
  _checkConnect() {
    setTimeout(() => {
      this._socket?.send(
        JSON.stringify({
          type: "ping",
        })
      );
      this._checkConnect();
    }, 5000);
  }

  _openSocket(chatId: number, token: string, userId: number) {
    console.log("OPEN SOCKET", userId, chatId, token);
    this._socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
    console.log(this._socket);
    this._socket.onerror = () => {
      console.error("Ошибка web socket");
    };
    this._socket.onopen = () => {
      console.log("Соединение успешно установлено");
      this._checkConnect();
    };
    this._socket.onclose = event => {
      if (event.wasClean) {
        console.log("Соединение успешно закрыто!");
      } else {
        console.error("Соединение сброшено!");
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    };

    this._socket.onmessage = event => {
      const data = JSON.parse(event.data) as MessageModel;
      console.log(data);
      if (data.type == "message") {
        console.log(this.listMessages);
        this.addMessage(
          new MessageListItem({
            text: data.content,
            date: data.time?.toTimeString(),
          })
        );
        console.log(this.listMessages);
      }
    };
  }

  public sendMessage(message: string) {
    console.log(message);
    this._socket?.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }
  public getCurrentChatId(): number | null {
    return this.currentChatId;
  }

  public subscribe(block: Block, keyProperty: string) {
    this._blocks.get(keyProperty)?.push(block);
  }

  public setCurrentChatId(id: number) {
    this.currentChatId = id;
  }

  public setCurrentUserId(id: number) {
    this.currentUserId = id;
  }
  public setChatList(chatList: Array<ChatListItem>) {
    this.listChats = chatList;
  }

  public addMessage(item: MessageListItem) {
    console.log(this.listMessages);
    this.listMessages.push(item);
  }
}

export default new ChatStore();
