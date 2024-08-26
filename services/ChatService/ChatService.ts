import { Exception } from "sass";
import FetchService from "../FetchService/FetchService";
import ChatPreview from "./models/ChatPreview";
import CreateChatModel from "./models/CreateChatModel";
import ChatTokenModel from "./models/ChatTokenModel";
import BaseURL from "../../constants/BaseURL";

class ChatService {
  private _apiService: FetchService;

  constructor() {
    this._apiService = new FetchService();
  }

  public async getChats(): Promise<Array<ChatPreview>> {
    return this._apiService
      .get(`${BaseURL}/chats`)
      .then(result => {
        try {
          return JSON.parse(result.response) as Array<ChatPreview>;
        } catch {
          throw new Error("Ошибка десериализации объекта");
        }
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
      .post(`${BaseURL}/chats`, {
        data: chatModel,
        method: "post",
      })
      .then(result => {
        try {
          return JSON.parse(result.response) as ChatPreview;
        } catch {
          throw new Error("Ошибка десериализации объекта");
        }
      })
      .catch((ex: Exception) => {
        console.error("Ошибка создания чата: " + ex);
        return null;
      });
  }

  public async addUsersInChat(users: Array<Number>, chatId: number) {
    this._apiService
      .put(`${BaseURL}/chats/users`, {
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
      .delete(`${BaseURL}/chats/users`, {
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
      .post(`${BaseURL}/chats/token/${chatId}`, {
        method: "post",
      })
      .then(result => {
        try {
          return JSON.parse(result.response) as ChatTokenModel;
        } catch {
          throw new Error("Ошибка десериализации объекта");
        }
      })
      .catch((ex: Exception) => {
        console.error("Ошибка удаления пользователя из чата: " + ex.message);
        return null;
      });
  }
}

export default new ChatService();
