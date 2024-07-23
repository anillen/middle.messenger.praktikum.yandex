import Form from "../../../../components/form/form";
import FormHeader from "../../../../components/form/components/header/header";
import LoginFormBody from "./components/form-body/form-body";
import Button from "../../../../components/button/button";
import Link from "../../../../components/link/link";
import FormFooter from "../../../../components/form/components/footer/footer";
import loginFormTemplate from "./login-form.hbs";
import "./login-form.scss";
export default class LoginForm extends Form {
  constructor() {
    super({
      formHeader: new FormHeader("Авторизация"),
      formBody: new LoginFormBody(),
      formFooter: new FormFooter({
        primaryButton: new Button({
          name: "login",
          type: "submit",
          text: "Войти",
          class: "button_primary",
        }),
        secondButton: new Link({
          text: "Создать аккаунт",
          to: "../registration/",
          class: "link_no-decoration",
        }),
      }),
    });
  }
}
