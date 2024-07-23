import Block from "../../../../../utils/Block";
import formBodyTemplate from "./body.hbs";
import "./body.scss";

export default class FormBody extends Block {
  constructor(formBodyProps: any) {
    super("div", { ...formBodyProps, attributes: { class: "form__body" } });
  }
  public render(): Node {
    return this.compile(formBodyTemplate, this.props);
  }
}
