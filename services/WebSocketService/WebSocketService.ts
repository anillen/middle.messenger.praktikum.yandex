export default class WebSocketService {
  private _socket: WebSocket;

  constructor(options: WebSocketOptions) {
    this._socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${options.userId}/${options.chatId}/${options.tokenValue}`
    );
    this._socket.addEventListener("open", () => {
      console.log("Содинение установлено!");
    });
    this._socket.addEventListener("close", (event: CloseEvent) => {
      if (event.wasClean) {
        console.log("Соединение успешно закрыто!");
      } else {
        console.log("Соединение сброшено!");
      }
    });
  }

  sendMessage(message: string) {
    this._socket.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }
}

interface WebSocketOptions {
  userId: number;
  chatId: number;
  tokenValue: string;
}
