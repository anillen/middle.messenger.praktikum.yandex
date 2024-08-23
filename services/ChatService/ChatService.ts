import { Exception } from "sass";
import FetchService from "../FetchService/FetchService";
import ChatPreview from "./models/ChatPreview";
import CreateChatModel from "./models/CreateChatModel";
import ChatTokenModel from "./models/ChatTokenModel";

class ChatService {
  private _apiService: FetchService;

  constructor() {
    this._apiService = new FetchService();
  }

  public async getChats(): Promise<Array<ChatPreview>> {
    return this._apiService
      .get("https://ya-praktikum.tech/api/v2/chats")
      .then(result => {
        return JSON.parse(result.response) as Array<ChatPreview>;
      })
      .catch((ex: Exception) => {
        console.error("Ошибка получения списка чатов: " + ex.message);
        return new Array<ChatPreview>();
      });
  }
  public async createChat(
    chatModel: CreateChatModel
  ): Promise<ChatPreview | null> {
    return this._apiService
      .post("https://ya-praktikum.tech/api/v2/chats", {
        data: chatModel,
        method: "post",
      })
      .then(result => {
        return JSON.parse(result.response) as ChatPreview;
      })
      .catch((ex: Exception) => {
        console.error("Ошибка создания чата: " + ex);
        return null;
      });
  }

  public async addUsersInChat(users: Array<Number>, chatId: number) {
    this._apiService
      .put("https://ya-praktikum.tech/api/v2/chats/users", {
        data: {
          users: users,
          chatId: chatId,
        },
        method: "put",
      })
      .catch((ex: Exception) => {
        console.error("Ошибка добавления пользователя в чат: " + ex.message);
      });
  }

  public async deleteUsersInChat(users: Array<Number>, chatId: number) {
    this._apiService
      .delete("https://ya-praktikum.tech/api/v2/chats/users", {
        data: {
          users: users,
          chatId: chatId,
        },
        method: "delete",
      })
      .catch((ex: Exception) => {
        console.error("Ошибка удаления пользователя из чата: " + ex.message);
      });
  }

  public async getChatToken(chatId: number): Promise<ChatTokenModel | null> {
    return this._apiService
      .post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {
        method: "post",
      })
      .then(result => {
        return JSON.parse(result.response) as ChatTokenModel;
      })
      .catch((ex: Exception) => {
        console.error("Ошибка удаления пользователя из чата: " + ex.message);
        return null;
      });
  }
}

export default new ChatService();
