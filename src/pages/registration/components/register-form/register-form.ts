import Form from "../../../../components/form/form";
import FormHeader from "../../../../components/form/components/header/header";
import FormInput from "../../../../components/form/components/input/input";
import Button from "../../../../components/button/button";
import Link from "../../../../components/link/link";
import FormFooter from "../../../../components/form/components/footer/footer";
import "./register-form.scss";
import RegisterFormBody from "./components/form-body/form-body";

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
        secondButton: new Link({ text: "Войти", to: "/src/pages/login/" }),
      }),
    });
  }
}
