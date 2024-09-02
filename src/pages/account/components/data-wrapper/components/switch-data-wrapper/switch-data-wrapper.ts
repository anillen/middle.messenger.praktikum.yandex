import "./switch-data-wrapper.scss";
import template from "./switch-data-wrapper.hbs";
import Block from "../../../../../../../utils/Block/Block";
import UserInfo from "../../../../../../../services/AuthService/models/UserInfo";
import InputWrapper from "../../../input-wrapper/input-wrapper";
import {
  EmailRegexp,
  NameRegexp,
} from "../../../../../../../constants/Regexps";
import Button from "../../../../../../components/button/button";

export default class SwitchDataWrapper extends Block {
  constructor(userInfo: UserInfo, formSubmitHandler: (e: Event) => void) {
    super("form", {
      attributes: {
        class: "switch-data-form",
      },
      events: {
        submit: formSubmitHandler,
      },
      emailInput: new InputWrapper({
        labelText: "Почта",
        name: "email",
        isDisabled: false,
        isRequired: true,
        checkValidate: (e: string) => EmailRegexp.test(e),
        validationErrorText: "Некорректный email",
        defaultValue: userInfo.email,
      }),
      loginInput: new InputWrapper({
        labelText: "Логин",
        name: "login",
        isDisabled: false,
        isRequired: true,
        checkValidate: (e: string) => EmailRegexp.test(e),
        validationErrorText: "Некорректный логин",
        defaultValue: userInfo.login,
      }),
      firstNameInput: new InputWrapper({
        labelText: "Имя",
        name: "first_name",
        isDisabled: false,
        isRequired: true,
        checkValidate: (e: string) => NameRegexp.test(e),
        validationErrorText: "Некорректное имя",
        defaultValue: userInfo.first_name,
      }),
      secondNameInput: new InputWrapper({
        labelText: "Фамилия",
        name: "second_name",
        isDisabled: false,
        isRequired: true,
        checkValidate: (e: string) => NameRegexp.test(e),
        validationErrorText: "Некорректная фамилия",
        defaultValue: userInfo.second_name,
      }),
      displayNameInput: new InputWrapper({
        labelText: "Имя в чате",
        name: "display_name",
        isDisabled: false,
        defaultValue: userInfo.display_name,
      }),
      phoneInput: new InputWrapper({
        labelText: "Номер телефона",
        name: "phone",
        isDisabled: false,
        isRequired: true,
        checkValidate: (e: string) => EmailRegexp.test(e),
        validationErrorText: "Некорректный номер телефона",
        defaultValue: userInfo.phone,
      }),
      submitButton: new Button({
        class: "button_primary",
        text: "Сохранить",
        type: "submit",
      }),
    });
  }

  public render(): Node {
    return this.compile(template, this.props);
  }
}
