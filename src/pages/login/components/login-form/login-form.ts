import Form from "../../../../components/form/form";
import FormHeader from "../../../../components/form/components/header/header";
import LoginFormBody from "./components/form-body/form-body";
import Button from "../../../../components/button/button";
import FormFooter from "../../../../components/form/components/footer/footer";
import "./login-form.scss";

import GetFormData from "../../../../../utils/GetFormData";
import Router from "../../../../../utils/Router";
import AuthService from "../../../../../services/AuthService/AuthService";
import SignInModel from "../../../../../services/AuthService/models/SignInModel";

const formBody = new LoginFormBody();

const router = new Router("main");
const submitFormHandler = (e: Event) => {
  e.preventDefault();

  formBody.setProps({ errorText: null });

  const formData = GetFormData<SignInModel>(e.target);

  AuthService.SignIn(formData).then(result => {
    if (result) {
      router.go("/messenger");
    } else {
      formBody.setProps({ errorText: "Неверное имя пользователя или пароль" });
    }
  });
};

export default class LoginForm extends Form {
  constructor() {
    super({
      formHeader: new FormHeader("Авторизация"),
      formBody: formBody,
      formFooter: new FormFooter({
        primaryButton: new Button({
          name: "login",
          type: "submit",
          text: "Войти",
          class: "button_primary",
        }),
        secondButton: new Button({
          text: "Создать аккаунт",
          class: "link_no-decoration",
          type: "button",
          events: {
            click: () => router.go("/sign-up"),
          },
        }),
      }),
      events: {
        submit: submitFormHandler,
      },
    });
  }
}
