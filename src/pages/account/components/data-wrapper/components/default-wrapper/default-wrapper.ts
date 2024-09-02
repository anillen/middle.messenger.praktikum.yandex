import UserInfo from "../../../../../../../services/AuthService/models/UserInfo";
import Block from "../../../../../../../utils/Block/Block";
import InputWrapper from "../../../input-wrapper/input-wrapper";
import ActionsWrapper from "../actions-wrapper/actions-wrapper";
import template from "./default-wrapper.hbs";
import "./default-wrapper.scss";

export default class DefaultWrapper extends Block {
  constructor(
    userInfo: UserInfo,
    switchDataHandler: Function,
    switchPasswordHandler: Function
  ) {
    super("div", {
      attributes: {
        class: "default-wrapper",
      },
      emailInput: new InputWrapper({
        labelText: "Почта",
        name: "email",
        isDisabled: true,
        defaultValue: userInfo.email,
      }),
      loginInput: new InputWrapper({
        labelText: "Логин",
        name: "login",
        isDisabled: true,
        defaultValue: userInfo.login,
      }),
      firstNameInput: new InputWrapper({
        labelText: "Имя",
        name: "first_name",
        isDisabled: true,
        defaultValue: userInfo.first_name,
      }),
      secondNameInput: new InputWrapper({
        labelText: "Фамилия",
        name: "second_name",
        isDisabled: true,
        defaultValue: userInfo.second_name,
      }),
      displayNameInput: new InputWrapper({
        labelText: "Имя в чате",
        name: "display_name",
        isDisabled: true,
        defaultValue: userInfo.display_name,
      }),
      phoneInput: new InputWrapper({
        labelText: "Номер телефона",
        name: "phone",
        isDisabled: true,
        defaultValue: userInfo.phone,
      }),
      actions: new ActionsWrapper(switchDataHandler, switchPasswordHandler),
    });
  }

  public render(): Node {
    return this.compile(template, this.props);
  }
}
