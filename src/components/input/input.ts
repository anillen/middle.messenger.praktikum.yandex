import Block from "../../../utils/Block/Block";
import inputTemplate from "./input.hbs";
import "./input.scss";

class InputProperties {
  class?: string;
  placeholder?: string;
  type?: string = "text";
  disabled?: boolean;
  value?: string;
  events?: object;
  name?: string;
  required?: boolean = false;
  accept?: string;
}

export default class Input extends Block {
  constructor(props: InputProperties) {
    super("input", {
      attributes: { ...props, events: null },
      events: props.events,
    });
  }

  public render(): Node {
    return this.compile(inputTemplate, this.props);
  }
}
