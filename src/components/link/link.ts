import Block from "../../../utils/Block/Block";
import linkTemplate from "./link.hbs";
import "./link.scss";

interface LinkProperties {
  class?: string;
  to: string;
  text: string;
}

export default class Link extends Block {
  constructor(linkProps: LinkProperties) {
    super("a", {
      attributes: {
        class: `link ${linkProps.class}`,
        href: linkProps.to,
      },
      text: linkProps.text,
    });
  }
  public render(): Node {
    return this.compile(linkTemplate, this.props);
  }
}
