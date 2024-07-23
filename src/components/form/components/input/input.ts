import Block from "../../../../../utils/Block";
import formInputTemplate from "./input.hbs";
import "./input.scss";

class FormInputProps {
  name?: string;
  labelText?: string;
  placeholder?: string;
  isRequired: boolean = false;
  type?: string = "text";
}

export default class FormInput extends Block {
  constructor(formInputProps: FormInputProps) {
    super("div", {
      ...formInputProps,
      attributes: { class: "form__controls" },
    });
  }
  public render(): Node {
    return this.compile(formInputTemplate, this.props);
  }
}
