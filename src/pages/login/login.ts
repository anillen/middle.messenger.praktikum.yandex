import "./login.scss";
import LoginForm from "./components/login-form/login-form";
import loginTemplate from "./login.hbs";
import Block from "../../../utils/Block";

const form = new LoginForm();
export default class Login extends Block {
  constructor() {
    super("div", {
      attributes: { class: "container-center" },
      loginForm: form,
    });
  }
  public render(): Node {
    return this.compile(loginTemplate, this.props);
  }
}
