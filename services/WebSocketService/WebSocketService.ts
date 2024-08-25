import MessageListItem from "../../src/pages/chats/components/right-column/components/message-list/components/message-list-item/message-list-item";
import ChatStore from "../../store/ChatStore";

interface MessageModel {
  content: string;
  time: string;
  user_id: number;
  id: number;
  type: string;
}

class WebSocketService {
  private _socket: WebSocket | null;
  constructor() {
    this._socket = null;
  }

  public open(userId: number, chatId: number, token: string) {
    this._socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    this._socket.onerror = () => {
      console.error("Ошибка web socket");
    };

    this._socket.onopen = () => {
      console.log("Соединение успешно установлено");
      this._checkConnect();

      this._socket?.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
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

      if (data instanceof Array) {
        ChatStore.replaceMessages(
          data.map((item: MessageModel) => {
            const date = new Date(item.time);
            return new MessageListItem({
              text: item.content,
              date: date.toLocaleTimeString(),
            });
          })
        );
      }

      if (data.type == "pong") {
        return;
      }
      if (data.type == "message") {
        const date = new Date(data.time);
        ChatStore.addMessage(
          new MessageListItem({
            text: data.content,
            date: date.toLocaleTimeString(),
          })
        );
      }
    };
  }

  public sendMessage(message: string) {
    this._socket?.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
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
}

export default new WebSocketService();
