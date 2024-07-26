import Form from "../../../../components/form/form";
import FormHeader from "../../../../components/form/components/header/header";
import Button from "../../../../components/button/button";
import Link from "../../../../components/link/link";
import FormFooter from "../../../../components/form/components/footer/footer";
import RegisterFormBody from "./components/form-body/form-body";
import "./register-form.scss";
import registerFormTemplate from "./register-form.hbs";
import GetFormData from "../../../../../utils/GetFormData";

const submitFormHandler = (e: Event) => {
  e.preventDefault();
  console.log(GetFormData(e.target));
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
        secondButton: new Link({
          text: "Войти",
          class: "link_no-decoration",
          to: "/login",
        }),
      }),
      events: {
        submit: submitFormHandler,
      },
    });
  }
}
