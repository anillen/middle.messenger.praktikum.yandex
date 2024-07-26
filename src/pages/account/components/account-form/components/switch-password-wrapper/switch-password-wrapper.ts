import Block from "../../../../../../../utils/Block";
import Input from "../input-wrapper/input-wrapper";
import "./switch-password-wrapper.scss";
import switchPasswordTemplate from "./switch-password-wrapper.hbs";
import { PasswordRegexp } from "../../../../../../../constants/Regexps";

export default class SwitchPasswordWrapper extends Block {
  constructor() {
    super("div", {
      attributes: { class: "card__data-wrapper" },
      oldPasswordInput: new Input({
        type: "password",
        labelText: "Старый пароль",
        name: "oldPassword",
        required: true,
        checkValidate: (value: string) => {
          return PasswordRegexp.test(value);
        },
        validationErrorText: "Некорректный пароль",
      }),
      newPasswordInput: new Input({
        type: "password",
        labelText: "Новый пароль",
        name: "password",
        required: true,
        checkValidate: (value: string) => {
          return PasswordRegexp.test(value);
        },
        validationErrorText: "Некорректный пароль",
      }),
      forgNewPasswordInput: new Input({
        type: "password",
        labelText: "Подтверждение пароля",
        name: "forgPassword",
        required: true,
        checkValidate: (value: string) => {
          return PasswordRegexp.test(value);
        },
        validationErrorText: "Некорректный пароль",
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
