import {
  EmailRegexp,
  LoginRegexp,
  NameRegexp,
  PhoneRegexp,
} from "../../../../../../../constants/Regexps";
import Block from "../../../../../../../utils/Block";
import InputWrapper from "../input-wrapper/input-wrapper";
import dataWrapperTemplate from "./data-wrapper.hbs";

export default class DataWrapper extends Block {
  constructor(isDisabled: boolean) {
    super("div", {
      attributes: { class: "card__data-wrapper" },
      isDisabled: isDisabled,
      emailInput: new InputWrapper({
        labelText: "Почта",
        name: "email",
        defaultValue: "pochta@yadnex.ru",
        isDisabled: isDisabled,
        checkValidate: (value: string) => {
          return EmailRegexp.test(value);
        },
        validationErrorText: "Некорректный адрес электронной почты",
      }),
      loginInput: new InputWrapper({
        labelText: "Логин",
        name: "login",
        defaultValue: "ivanivanov",
        checkValidate: (value: string) => {
          return LoginRegexp.test(value);
        },
        validationErrorText: "Некорректный логин",
        isDisabled: isDisabled,
      }),
      firstNameInput: new InputWrapper({
        labelText: "Имя",
        name: "first_name",
        defaultValue: "Иван",
        checkValidate: (value: string) => {
          return NameRegexp.test(value);
        },
        validationErrorText: "Некорректное имя",
        isDisabled: isDisabled,
      }),
      secondNameInput: new InputWrapper({
        labelText: "Фамилия",
        name: "second_name",
        checkValidate: (value: string) => {
          return NameRegexp.test(value);
        },
        validationErrorText: "Некорректная фамилия",
        defaultValue: "Иванов",
        isDisabled: isDisabled,
      }),
      displayNameInput: new InputWrapper({
        labelText: "Имя в чате",
        name: "display_name",
        defaultValue: "Иван",
        isDisabled: isDisabled,
      }),
      phoneInput: new InputWrapper({
        labelText: "Телефон",
        name: "phone",
        checkValidate: (value: string) => {
          return PhoneRegexp.test(value);
        },
        validationErrorText: "Некорректный номер телефона",
        defaultValue: "+79261234567",
        isDisabled: isDisabled,
      }),
    });
  }

  public render(): Node {
    return this.compile(dataWrapperTemplate, this.props);
  }
}
