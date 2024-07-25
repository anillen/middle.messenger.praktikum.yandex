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
        validationRegular: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]+"),
      }),
      loginInput: new InputWrapper({
        labelText: "Логин",
        name: "login",
        defaultValue: "ivanivanov",
        isDisabled: isDisabled,
      }),
      firstNameInput: new InputWrapper({
        labelText: "Имя",
        name: "first_name",
        defaultValue: "Иван",
        isDisabled: isDisabled,
      }),
      secondNameInput: new InputWrapper({
        labelText: "Фамилия",
        name: "second_name",
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
        defaultValue: "+7 (909) 967 30 30",
        isDisabled: isDisabled,
      }),
    });
  }

  public render(): Node {
    return this.compile(dataWrapperTemplate, this.props);
  }
}
