import AuthService from "../services/AuthService/AuthService";
import ChatService from "../services/ChatService/ChatService";
import WebSocketService from "../services/WebSocketService/WebSocketService";
import ChatList from "../src/pages/chats/components/left-column/components/chat-list/chat-list";
import ChatListItem from "../src/pages/chats/components/left-column/components/chat-list/components/chat-list-item/chat-list-item";
import MessageActions from "../src/pages/chats/components/right-column/components/message-actions/message-actions";
import MessageListItem from "../src/pages/chats/components/right-column/components/message-list/components/message-list-item/message-list-item";
import MessageList from "../src/pages/chats/components/right-column/components/message-list/message-list";
import Block from "../utils/Block/Block";

class ChatStore {
  public currentChatId: number | null;
  public currentUserId: number | null;
  public currentChatToken: string | null;
  public listMessages: Array<MessageListItem>;
  public listChats: Array<ChatListItem>;
  public updateListChat: boolean;

  private _blocks: Map<string, Array<Block>>;

  constructor() {
    this._blocks = new Map<string, Array<Block>>();
    this.currentChatId = null;
    this.currentUserId = null;
    this.currentChatToken = null;
    this.updateListChat = false;
    this.listChats = new Array<ChatListItem>();
    this.listMessages = new Array<MessageListItem>();

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
                WebSocketService.open(userInfo.id, value, token.token);
              });
            })
            .catch(() => {
              console.error("Не удалось получить токен чата");
            });

          this._blocks.get("currentChatId").forEach((block: Block) => {
            block.setProps({
              ...block.props,
              currentChatId: value,
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
    });
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
    this._blocks.get("listMessages")?.forEach((block: Block) => {
      block.setProps({
        ...block.props,
        listMessages: new MessageList(
          new Array<MessageListItem>(...block.props.listMessages.props.listMessages, item)
        ),
      });
    });
  }

  public replaceMessages(item: Array<MessageListItem>) {
    this._blocks.get("listMessages")?.forEach((block: Block) => {
      block.setProps({
        ...block.props,
        listMessages: new MessageList(item),
        messageActions: new MessageActions(),
      });
    });
  }
}

export default new ChatStore();
