import {
  EmailRegexp,
  LoginRegexp,
  NameRegexp,
  PasswordRegexp,
  PhoneRegexp,
} from "../../../../../../../constants/Regexps";
import FormBody from "../../../../../../components/form/components/body/body";
import FormInput from "../../../../../../components/form/components/input/input";

import registerFormTemplate from "./form-body.hbs";

export default class RegisterFormBody extends FormBody {
  constructor() {
    super({
      emailInput: new FormInput({
        labelText: "Почта",
        name: "email",
        isRequired: true,
        checkValidate: (value: string) => {
          return EmailRegexp.test(value);
        },
        validateErrorMessage: "Некорректный адрес электронной почты",
      }),
      loginInput: new FormInput({
        labelText: "Логин",
        name: "login",
        isRequired: true,
        checkValidate: (value: string) => {
          return LoginRegexp.test(value);
        },
        validateErrorMessage: "Некорректный логин",
      }),
      firstNameInput: new FormInput({
        labelText: "Имя",
        name: "first_name",
        isRequired: true,
        checkValidate: (value: string) => {
          return NameRegexp.test(value);
        },
        validateErrorMessage: "Некорректное имя",
      }),
      secondNameInput: new FormInput({
        labelText: "Фамилия",
        name: "second_name",
        isRequired: true,
        checkValidate: (value: string) => {
          return NameRegexp.test(value);
        },
        validateErrorMessage: "Некорректная фамилия",
      }),
      phoneInput: new FormInput({
        labelText: "Телефон",
        name: "phone",
        isRequired: true,
        checkValidate: (value: string) => {
          return PhoneRegexp.test(value);
        },
        validateErrorMessage: "Некорректный номер телефона",
      }),
      passwordInput: new FormInput({
        labelText: "Пароль",
        name: "password",
        type: "password",
        isRequired: true,
        checkValidate: (value: string) => {
          return PasswordRegexp.test(value);
        },
        validateErrorMessage: "Некорректный пароль",
      }),
      forgPasswordInput: new FormInput({
        labelText: "Пароль (ещё раз)",
        type: "password",
        isRequired: true,
        checkValidate: (value: string) => {
          return PasswordRegexp.test(value);
        },
        validateErrorMessage: "Некорректный пароль",
      }),
    });
  }

  public render(): Node {
    return this.compile(registerFormTemplate, this.props);
  }
}
