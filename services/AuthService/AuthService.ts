import { Exception } from "sass";
import FetchService from "../FetchService/FetchService";
import SignInModel from "./models/SignInModel";
import SignUpModel from "./models/SignUpModel";
import UserInfo from "./models/UserInfo";
import ErrorModel from "../Models/ErrorModel";

class AuthService {
  public isAuthenticate: boolean;
  private _apiService: FetchService;

  constructor() {
    this.isAuthenticate =
      Boolean(localStorage.getItem("isAuthenticate")) ?? false;
    this._apiService = new FetchService();
  }

  public async SignIn(model: SignInModel): Promise<boolean> {
    return this._apiService
      .post("https://ya-praktikum.tech/api/v2/auth/signin", {
        method: "post",
        data: model,
      })
      .then(result => {
        console.log(result);
        switch (result.status) {
          case 200:
            this.isAuthenticate = true;
            localStorage.setItem("isAuthenticate", "true");
            return true;
          case 400:
            const { reason } = JSON.parse(result.response) as ErrorModel;
            if (reason == "User already in system") {
              this.isAuthenticate = true;
              localStorage.setItem("isAuthenticate", "true");
              return true;
            }
          default:
            this.isAuthenticate = false;
            localStorage.removeItem("isAuthenticate");
            return false;
        }
      })
      .catch((ex: Exception) => {
        console.error("Ошибка авторизации:" + ex.message);
        this.isAuthenticate = false;
        localStorage.removeItem("isAuthenticate");
        return false;
      });
  }

  public async SignUp(model: SignUpModel): Promise<boolean> {
    return this._apiService
      .post("https://ya-praktikum.tech/api/v2/auth/signup", {
        method: "post",
        data: model,
      })
      .then((result: any) => {
        console.log(result);
        if (result.status == 200) {
          this.isAuthenticate = true;
          return true;
        } else {
          this.isAuthenticate = false;
          return false;
        }
      })
      .catch((ex: Exception) => {
        console.error("Ошибка регистрации:" + ex.message);
        this.isAuthenticate = false;
        localStorage.removeItem("isAuthenticate");
        return false;
      });
  }

  public async Logout(): Promise<unknown> {
    this.isAuthenticate = false;
    localStorage.removeItem("isAuthenticate");
    return this._apiService
      .post("https://ya-praktikum.tech/api/v2/auth/logout", {
        method: "post",
      })
      .catch((ex: Exception) => {
        console.error("Ошибка выхода из системы:" + ex.message);
      });
  }

  public async GetUserInfo(): Promise<UserInfo | null> {
    return this._apiService
      .get("https://ya-praktikum.tech/api/v2/auth/user", {
        method: "get",
      })
      .then((result: any) => {
        return JSON.parse(result.response) as UserInfo;
      })
      .catch((ex: Exception) => {
        console.error("Ошибка получения данных пользователя:" + ex.message);
        return null;
      });
  }
}

export default new AuthService();
