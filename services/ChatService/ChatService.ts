import FetchService from "../FetchService/FetchService";
import ResponseModel from "../Models/ResponseModel";
import ChatPreview from "./models/ChatPreview";
import CreateChatModel from "./models/CreateChatModel";

class ChatService {
  private _apiService: FetchService;

  constructor() {
    this._apiService = new FetchService();
  }

  public async getChats(): Promise<Array<ChatPreview>> {
    return this._apiService
      .get("https://ya-praktikum.tech/api/v2/chats")
      .then(result => {
        const { response } = result as ResponseModel;
        return JSON.parse(response);
      }) as Promise<Array<ChatPreview>>;
  }
  public async createChat(chatModel: CreateChatModel): Promise<void> {
    this._apiService.post("https://ya-praktikum.tech/api/v2/chats", {
      data: chatModel,
      method: "post",
    });
  }

  public async addUsersInChat(users: Array<Number>, chatId: number) {
    this._apiService.put("https://ya-praktikum.tech/api/v2/chats/users", {
      data: {
        users: users,
        chatId: chatId,
      },
      method: "put",
    });
  }
  public async deleteUsersInChat(users: Array<Number>, chatId: number) {
    this._apiService.delete("https://ya-praktikum.tech/api/v2/chats/users", {
      data: {
        users: users,
        chatId: chatId,
      },
      method: "delete",
    });
  }
}

export default new ChatService();
