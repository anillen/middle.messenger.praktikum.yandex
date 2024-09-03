import Block from "../../../../../utils/Block/Block";
import headerTemplate from "./header.hbs";
import "./header.scss";

export default class FormHeader extends Block {
  constructor(title: string) {
    super("div", { title: title, attributes: { class: "form__header" } });
  }

  public render(): Node {
    return this.compile(headerTemplate, this.props);
  }
}
