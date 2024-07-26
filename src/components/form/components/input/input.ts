import Block from "../../../../../utils/Block";
import Input from "../../../input/input";
import formInputTemplate from "./input.hbs";
import "./input.scss";

class FormInputProps {
  name?: string;
  labelText?: string;
  placeholder?: string;
  isRequired: boolean = false;
  type?: string = "text";
  checkValidate?: Function;
  validateErrorMessage?: string;
}

const inputBlurHandler = (e: Event, inputWrapper: Block) => {
  if (!inputWrapper.props.checkValidate) {
    return;
  }

  if (e.target instanceof HTMLInputElement) {
    if (!inputWrapper.props.checkValidate(e.target.value)) {
      inputWrapper.setProps({
        attributes: { class: "form__controls form_controls_error" },
      });

      e.target.setCustomValidity(inputWrapper.props.validateErrorMessage);
    } else {
      inputWrapper.setProps({
        attributes: { class: "form__controls form_controls_valid" },
      });

      e.target.setCustomValidity("");
    }
  }
};

export default class FormInput extends Block {
  constructor(formInputProps: FormInputProps) {
    super("div", {
      ...formInputProps,
      attributes: { class: "form__controls" },

      input: new Input({
        name: formInputProps.name,
        class: "controls__input",
        type: formInputProps.type,
        required: formInputProps.isRequired,
        placeholder: formInputProps.placeholder,
        events: {
          blur: (e: Event) => {
            inputBlurHandler(e, this);
          },
        },
      }),
    });
  }
  public render(): Node {
    return this.compile(formInputTemplate, this.props);
  }
}
