import Block from "../../../utils/Block";
import FormBody from "./components/body/body";
import FormFooter from "./components/footer/footer";
import FormHeader from "./components/header/header";
import formTemplate from "./form.hbs";
import "./form.scss";

class FormProps {
  formHeader: FormHeader;
  formBody?: FormBody;
  formFooter?: FormFooter;
}

export default class Form extends Block {
  constructor(propsAndChild?: FormProps) {
    super("form", { ...propsAndChild, attributes: { class: "form" } });
  }
  public render(): Node {
    return this.compile(formTemplate, this.props);
  }
}