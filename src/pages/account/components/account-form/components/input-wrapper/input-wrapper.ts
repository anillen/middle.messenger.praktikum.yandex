import Block from "../../../../../../../utils/Block";
import Input from "../../../../../../components/input/input";
import inputTemplate from "./input-wrapper.hbs";
import "./input-wrapper.scss";

class InputProps {
  labelText: string;
  type?: string = "text";
  defaultValue?: string;
  name: string;
  isDisabled?: boolean = false;
  validationRegular?: RegExp;
  validationErrorText?: string;
}

const validationHandler = (e: Event, validationRegular: RegExp | undefined) => {
  if (e.target instanceof HTMLInputElement && validationRegular) {
    if (!validationRegular.test(e.target.value)) {
      e.target.className =
        "profile-input-wrapper__input profile-input-wrapper__input_error";
    } else {
      e.target.className = "profile-input-wrapper__input";
    }
  }
};

export default class InputWrapper extends Block {
  validation = (e) => {
    console.log(e);
  };

  constructor(props: InputProps) {
    super("div", {
      attributes: { class: "row profile-input-wrapper" },
      input: new Input({
        disabled: props.isDisabled,
        name: props.name,
        value: props.defaultValue,
        type: props.type,
        class: "profile-input-wrapper__input",
        events: {
          blur: (e) => {
            validationHandler(e, props.validationRegular);
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
