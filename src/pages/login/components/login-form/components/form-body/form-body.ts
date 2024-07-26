import FormBody from "../../../../../../components/form/components/body/body";
import loginFormBodyTemplate from "./form-body.hbs";
import "./form-body.scss";
import FormInput from "../../../../../../components/form/components/input/input";

export default class LoginFormBody extends FormBody {
  constructor() {
    super({
      loginInput: new FormInput({
        isRequired: true,
        placeholder: "Логин",
        name: "login",
      }),
      passwordInput: new FormInput({
        isRequired: true,
        placeholder: "Пароль",
        type: "password",
        name: "password",
      }),
    });
  }

  public render(): Node {
    return this.compile(loginFormBodyTemplate, this.props);
  }
}
