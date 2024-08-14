import Form from "../../../../components/form/form";
import FormHeader from "../../../../components/form/components/header/header";
import LoginFormBody from "./components/form-body/form-body";
import Button from "../../../../components/button/button";
import FormFooter from "../../../../components/form/components/footer/footer";
import "./login-form.scss";

import GetFormData from "../../../../../utils/GetFormData";
import Router from "../../../../../utils/Router";

const router = new Router("main");

const submitFormHandler = (e: Event) => {
  e.preventDefault();
  console.log(GetFormData(e.target));
  router.go("/messenger");
};

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
