import Block from "../../../../../utils/Block/Block";
import formBodyTemplate from "./body.hbs";
import "./body.scss";

export default class FormBody extends Block {
  constructor(formBodyProps: object) {
    super("div", { ...formBodyProps, attributes: { class: "form__body" } });
  }
  public render(): Node {
    return this.compile(formBodyTemplate, this.props);
  }
}
