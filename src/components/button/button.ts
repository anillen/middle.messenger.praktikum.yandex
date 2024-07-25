import Block from "../../../utils/Block";
import "./button.scss";
import buttonTemplate from "./button.hbs";

class ButtonProperties {
  type?: string = "button";
  name?: string;
  class?: string;
  image?: string;
  text?: string;
  events?: object;
}

export default class Button extends Block {
  constructor(buttonProps: ButtonProperties) {
    super("button", {
      attributes: {
        type: buttonProps.type,
        class: `button ${buttonProps.class}`,
        name: buttonProps.name,
      },
      image: buttonProps.image,
      text: buttonProps.text,
      events: buttonProps.events,
    });
  }
  public render(): Node {
    return this.compile(buttonTemplate, this.props);
  }
}
