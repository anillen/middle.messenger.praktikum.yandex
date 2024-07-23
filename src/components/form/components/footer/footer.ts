import Block from "../../../../../utils/Block";
import formFooterTemplate from "./footer.hbs";
import "./footer.scss";

class FormFooterProperties {
  primaryButton: Block;
  secondButton: Block;
}

export default class FormFooter extends Block {
  constructor(formFooterProps: FormFooterProperties) {
    super("div", { ...formFooterProps, attributes: { class: "form__footer" } });
  }

  public render(): Node {
    return this.compile(formFooterTemplate, this.props);
  }
}
