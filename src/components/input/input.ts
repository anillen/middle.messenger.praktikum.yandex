import Block from "../../../utils/Block";
import Image from "../image/image";
import inputTemplate from "./input.hbs";
import "./input.scss";

class InputProperties {
  icon?: Image;
  class?: string;
  placeholder?: string;
  type?: string = "text";
  name?: string;
}

export default class Input extends Block {
  constructor(props: InputProperties) {
    super("div", { ...props, attributes: { class: "input-container" } });
  }

  public render(): Node {
    return this.compile(inputTemplate, this.props);
  }
}
