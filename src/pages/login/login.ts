import "./login.scss";
import LoginForm from "./components/login-form/login-form";
import loginTemplate from "./login.hbs";
import Block from "../../../utils/Block/Block";
import AuthService from "../../../services/AuthService/AuthService";
import Router from "../../../utils/Router/Router";

const form = new LoginForm();
export default class Login extends Block {
  constructor() {
    if (AuthService.isAuthenticate == true) {
      const router = new Router("main");
      router.go("/messenger");
    }
    super("div", {
      attributes: { class: "container-center" },
      loginForm: form,
    });
  }
  public render(): Node {
    return this.compile(loginTemplate, this.props);
  }
}
