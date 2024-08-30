import "./switch-password-wrapper.scss";
import template from "./switch-password-wrapper.hbs";
import Block from "../../../../../../../utils/Block/Block";
import InputWrapper from "../../../input-wrapper/input-wrapper";
import { PasswordRegexp } from "../../../../../../../constants/Regexps";
import Button from "../../../../../../components/button/button";
import GetFormData from "../../../../../../../utils/GetFormData";
import SwitchPasswordModel from "../../../../../../../services/AccountService/models/SwitchPasswordModel";
import AccountService from "../../../../../../../services/AccountService/AccountService";

export default class SwitchPasswordWrapper extends Block {
  formSubmit(dataObject: SwitchPasswordModel): Promise<boolean> {
    if (dataObject.newPassword != dataObject.forgNewPassword) {
      this.setProps({
        ...this.props,
        errorMessage: "Некорректное подтверждение пароля",
      });
      return new Promise(() => false);
    }
    return AccountService.changePassword(dataObject).then(result => result);
  }

  constructor(switchPasswordFormOnSubmit: Function) {
    super("form", {
      errorMessage: "",
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const formObject = GetFormData<SwitchPasswordModel>(e.target);
          this.formSubmit(formObject).then(result => {
            if (result == true) {
              switchPasswordFormOnSubmit();
            } else {
              this.setProps({
                ...this.props,
                errorMessage: "Неправильный пароль",
              });
            }
          });
        },
      },
      oldPasswordInput: new InputWrapper({
        labelText: "Старый пароль",
        name: "oldPassword",
        type: "password",
        isRequired: true,
      }),
      newPasswordInput: new InputWrapper({
        labelText: "Новый пароль",
        name: "newPassword",
        type: "password",
        isRequired: true,
        checkValidate: (value: string) => PasswordRegexp.test(value),
        validationErrorText:
          "Пароль должен содержать 1 цифру 1 заглавную букву и быть не менее 8 символов",
      }),
      forgNewPasswordInput: new InputWrapper({
        labelText: "Подтверждение пароля",
        name: "forgNewPassword",
        type: "password",
        isRequired: true,
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
