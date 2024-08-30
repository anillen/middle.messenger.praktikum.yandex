import RegisterForm from "./components/register-form/register-form";
import "./registration.scss";
import registrationTemplate from "./registration.hbs";
import Block from "../../../utils/Block/Block";

const form = new RegisterForm();
export default class Registration extends Block {
  constructor() {
    super("div", {
      attributes: { class: "container-center" },
      registrationForm: form,
    });
  }
  public render(): Node {
    return this.compile(registrationTemplate, this.props);
  }
}
