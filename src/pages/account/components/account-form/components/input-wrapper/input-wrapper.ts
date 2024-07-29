/* eslint-disable @typescript-eslint/ban-types */
import Block from "../../../../../../../utils/Block";
import Input from "../../../../../../components/input/input";
import inputTemplate from "./input-wrapper.hbs";
import "./input-wrapper.scss";

interface InputProps {
  labelText: string;
  type?: string;
  defaultValue?: string;
  name: string;
  isDisabled?: boolean;
  checkValidate?: Function;
  validationErrorText?: string;
  required?: boolean;
}

const validationHandler = (e: Event, inputWrapper: Block) => {
  const { checkValidate } = inputWrapper.props;
  if (!checkValidate) {
    return;
  }

  if (e.target instanceof HTMLInputElement) {
    if (!checkValidate(e.target.value)) {
      inputWrapper.setProps({
        attributes: { class: "row_error profile-input-wrapper" },
      });
      e.target.setCustomValidity(inputWrapper.props.validationErrorText);
    } else {
      inputWrapper.setProps({
        attributes: { class: "row_valid profile-input-wrapper" },
      });
      e.target.setCustomValidity("");
    }
  }
};

export default class InputWrapper extends Block {
  constructor(props: InputProps) {
    super("div", {
      attributes: { class: "row profile-input-wrapper" },
      checkValidate: props.checkValidate,
      validationErrorText: props.validationErrorText,
      input: new Input({
        disabled: props.isDisabled ?? false,
        name: props.name,
        value: props.defaultValue,
        type: props.type ?? "text",
        required: props.required ?? false,
        class: "profile-input-wrapper__input",
        events: {
          blur: (e: Event) => {
            validationHandler(e, this);
          },
        },
      }),
      labelText: props.labelText,
    });
  }

  public render(): Node {
    return this.compile(inputTemplate, this.props);
  }
}
