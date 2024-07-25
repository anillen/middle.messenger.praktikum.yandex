import Block from "../../../utils/Block";
import Image from "../image/image";
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

/**{{#if icon}}
  {{{icon}}}
{{/if}}
<input
  class="{{#if icon}}input_icon{{/if}} {{class}}"
  {{#if placeholder}}
    placeholder="{{placeholder}}"
  {{/if}}
  {{#if type}}
    type="{{type}}"
  {{/if}}
/> */
