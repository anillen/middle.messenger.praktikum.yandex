/* eslint-disable @typescript-eslint/ban-types */

import Block from "../../../../../utils/Block";
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
  isRequired?: boolean;
  isError?: boolean;
}

const validationHandler = (e: Event, inputWrapper: Block) => {
  const { checkValidate } = inputWrapper.props;
  if (!checkValidate) {
    return;
  }

  if (e.target instanceof HTMLInputElement) {
    if (!checkValidate(e.target.value)) {
      inputWrapper.setProps({
        attributes: { class: "row_error" },
        isError: true,
        defaultValue: e.target.value,
      });
      e.target.setCustomValidity(inputWrapper.props.validationErrorText);
    } else {
      inputWrapper.setProps({
        attributes: { class: "row_valid profile-input-wrapper" },
        isError: false,
        defaultValue: e.target.value,
      });
      e.target.setCustomValidity("");
    }
  }
};

export default class InputWrapper extends Block {
  constructor(props: InputProps) {
    super("div", {
      defaultValue: props.defaultValue,
      isDisabled: props.isDisabled,
      isRequired: props.isRequired,
      labelText: props.labelText,
      checkValidate: props.checkValidate,
      name: props.name,
      type: props.type,
      validationErrorText: props.validationErrorText,
      attributes: { class: "row profile-input-wrapper" },
      eventSelector: "input",
      events: {
        blur: (e: Event) => {
          validationHandler(e, this);
        },
      },
    });
  }

  public render(): Node {
    return this.compile(inputTemplate, this.props);
  }
}
