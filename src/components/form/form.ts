import Block from "../../../utils/Block";
import formTemplate from "./form.hbs";
import "./form.scss";

class FormProps {
  formHeader: Block;
  formBody?: Block;
  formFooter?: Block;
}

export default class Form extends Block {
  constructor(propsAndChild?: FormProps) {
    super("form", { ...propsAndChild, attributes: { class: "form" } });
  }
  public render(): Node {
    return this.compile(formTemplate, this.props);
  }
}
