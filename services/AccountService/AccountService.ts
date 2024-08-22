import { Exception } from "sass";
import UserInfo from "../AuthService/models/UserInfo";
import FetchService from "../FetchService/FetchService";
import ResponseModel from "../Models/ResponseModel";
import SwitchAvatarModel from "./models/SwitchAvatarModel";
import SwitchDataModel from "./models/SwitchDataModel";
import SwitchPasswordModel from "./models/SwitchPasswordModel";

class AccountService {
  private _apiService: FetchService;

  constructor() {
    this._apiService = new FetchService();
  }

  async changeUserProfile(userInfo: SwitchDataModel): Promise<void> {
    this._apiService
      .put("https://ya-praktikum.tech/api/v2/user/profile", {
        method: "put",
        data: userInfo,
      })
      .catch((ex: Exception) => {
        console.error("Ошибка смены данных пользователя:" + ex.message);
      });
  }

  async changePassword(
    switchPasswordModel: SwitchPasswordModel
  ): Promise<boolean> {
    return this._apiService
      .put("https://ya-praktikum.tech/api/v2/user/password", {
        method: "put",
        data: {
          oldPassword: switchPasswordModel.oldPassword,
          newPassword: switchPasswordModel.newPassword,
        },
      })
      .then((result: any) => {
        if (result.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((ex: Exception) => {
        console.error("Ошибка смены пароля:" + ex.message);
        return false;
      });
  }

  async changeAvatar(avatarModel: SwitchAvatarModel): Promise<UserInfo | null> {
    const formData = new FormData();
    formData.append("avatar", avatarModel.file);
    return this._apiService
      .put("https://ya-praktikum.tech/api/v2/user/profile/avatar", {
        method: "put",
        formData: formData,
      })
      .then(result => {
        return JSON.parse(result.response) as UserInfo;
      })
      .catch((ex: Exception) => {
        console.error("Ошибка смены аватара:" + ex.message);
        return null;
      });
  }

  async searchUserByLogin(login: string): Promise<Array<UserInfo>> {
    return this._apiService
      .post("https://ya-praktikum.tech/api/v2/user/search", {
        method: "post",
        data: {
          login: login,
        },
      })
      .then(result => {
        const { response } = result as ResponseModel;
        return JSON.parse(response) as Array<UserInfo>;
      })
      .catch((ex: Exception) => {
        console.error("Ошибка поиска:" + ex.message);
        return new Array<UserInfo>();
      });
  }
}

export default new AccountService();
