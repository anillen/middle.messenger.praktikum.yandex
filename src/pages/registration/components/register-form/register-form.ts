import Form from "../../../../components/form/form";
import FormHeader from "../../../../components/form/components/header/header";
import Button from "../../../../components/button/button";
import Link from "../../../../components/link/link";
import FormFooter from "../../../../components/form/components/footer/footer";
import RegisterFormBody from "./components/form-body/form-body";
import "./register-form.scss";
import registerFormTemplate from "./register-form.hbs";
export default class RegisterForm extends Form {
  constructor() {
    super({
      formHeader: new FormHeader("Регистрация"),
      formBody: new RegisterFormBody(),
      formFooter: new FormFooter({
        primaryButton: new Button({
          text: "Зарегистрироваться",
          type: "submit",
          class: "button_primary",
        }),
        secondButton: new Link({
          text: "Войти",
          class: "link_no-decoration",
          to: "/src/pages/login/",
        }),
      }),
    });
  }
}
