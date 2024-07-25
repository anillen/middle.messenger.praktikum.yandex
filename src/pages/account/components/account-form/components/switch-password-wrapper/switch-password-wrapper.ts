import Block from "../../../../../../../utils/Block";
import Input from "../input-wrapper/input-wrapper";
import "./switch-password-wrapper.scss";
import switchPasswordTemplate from "./switch-password-wrapper.hbs";

export default class SwitchPasswordWrapper extends Block {
  constructor() {
    super("div", {
      attributes: { class: "card__data-wrapper" },
      oldPasswordInput: new Input({
        type: "password",
        labelText: "Старый пароль",
        name: "oldPassword",
      }),
      newPasswordInput: new Input({
        type: "password",
        labelText: "Новый пароль",
        name: "password",
      }),
      forgNewPasswordInput: new Input({
        type: "password",
        labelText: "Подтверждение пароля",
        name: "forgPassword",
      }),
    });
  }

  public render(): Node {
    return this.compile(switchPasswordTemplate, this.props);
  }
}

/**
{{> input type="password" labelText="Старый пароль" name="oldPassword"}} 
{{> input type="password" labelText="Новый пароль"}}
{{> input type="password" labelText="Подтверждение пароля" name="newPassword"}}
 */
