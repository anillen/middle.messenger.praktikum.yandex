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
      }),
      loginInput: new FormInput({
        labelText: "Логин",
        name: "login",
        isRequired: true,
      }),
      firstNameInput: new FormInput({
        labelText: "Имя",
        name: "first_name",
        isRequired: true,
      }),
      secondNameInput: new FormInput({
        labelText: "Фамилия",
        name: "second_name",
        isRequired: true,
      }),
      phoneInput: new FormInput({
        labelText: "Телефон",
        name: "phone",
        isRequired: true,
      }),
      passwordInput: new FormInput({
        labelText: "Пароль",
        name: "password",
        type: "password",
        isRequired: true,
      }),
      forgPasswordInput: new FormInput({
        labelText: "Пароль (ещё раз)",
        type: "password",
        isRequired: true,
      }),
    });
  }

  public render(): Node {
    return this.compile(registerFormTemplate, this.props);
  }
}
