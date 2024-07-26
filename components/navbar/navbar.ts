import navbarTemplate from "./navbar.hbs";
import Block from "../../utils/Block";
import "./navbar.scss";

export default class Navbar extends Block {
  constructor(propsAndChildren?: object) {
    super("nav", {
      ...propsAndChildren,
      attributes: { class: "container-center" },
    });
  }
  public render(): Node {
    return this.compile(navbarTemplate, this.props);
  }
}
