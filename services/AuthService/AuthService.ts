import FetchService from "../FetchService/FetchService";
import SignInModel from "./models/SignInModel";
import SignUpModel from "./models/SignUpModel";
import UserInfo from "./models/UserInfo";

class AuthService {
  public isAuthenticate: boolean;
  private _apiService: FetchService;

  constructor() {
    this.isAuthenticate =
      Boolean(localStorage.getItem("isAuthenticate")) ?? false;
    this._apiService = new FetchService();
    console.log(this);
  }

  public async SignIn(model: SignInModel): Promise<boolean> {
    return this._apiService
      .post("https://ya-praktikum.tech/api/v2/auth/signin", {
        method: "post",
        data: model,
      })
      .then((result: any) => {
        console.log(result);

        if (result.status == 200) {
          this.isAuthenticate = true;
          localStorage.setItem("isAuthenticate", "true");
          return true;
        } else {
          this.isAuthenticate = false;
          localStorage.removeItem("isAuthenticate");
          return false;
        }
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
      });
  }

  public async Logout(): Promise<unknown> {
    this.isAuthenticate = false;
    localStorage.removeItem("isAuthenticate");
    console.log(this);
    return this._apiService.post(
      "https://ya-praktikum.tech/api/v2/auth/logout",
      {
        method: "post",
      }
    );
  }

  public async GetUserInfo(): Promise<UserInfo> {
    return this._apiService
      .get("https://ya-praktikum.tech/api/v2/auth/user", {
        method: "get",
      })
      .then((result: any) => {
        return JSON.parse(result.response) as UserInfo;
      });
  }
}

export default new AuthService();
