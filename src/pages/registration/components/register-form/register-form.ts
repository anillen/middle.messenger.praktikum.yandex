import Form from "../../../../components/form/form";
import FormHeader from "../../../../components/form/components/header/header";
import Button from "../../../../components/button/button";
import FormFooter from "../../../../components/form/components/footer/footer";
import RegisterFormBody from "./components/form-body/form-body";
import "./register-form.scss";
import GetFormData from "../../../../../utils/GetFormData";
import Router from "../../../../../utils/Router/Router";
import AuthService from "../../../../../services/AuthService/AuthService";
import SignUpModel from "../../../../../services/AuthService/models/SignUpModel";

const router = new Router("main");

const submitFormHandler = (e: Event) => {
  e.preventDefault();
  const formData = GetFormData<SignUpModel>(e.target);
  AuthService.SignUp(formData).then(result => {
    if (result) {
      router.go("/messenger");
    }
  });
};

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
        secondButton: new Button({
          text: "Войти",
          class: "link_no-decoration",
          events: {
            click: () => router.go("/"),
          },
        }),
      }),
      events: {
        submit: submitFormHandler,
      },
    });
  }
}
