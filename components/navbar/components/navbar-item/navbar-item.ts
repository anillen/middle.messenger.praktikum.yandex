import Block from "../../../../utils/Block/Block";
import navbaritemTemplate from "./navbar-item.hbs";
import "./navbar-item.scss";

interface Props {
  linkTo: string;
  text: string;
}

export default class NavbarItem extends Block {
  constructor(propsAndChildren?: Props) {
    super("li", { ...propsAndChildren, settings: { withInternalID: true } });
  }
  public render(): Node {
    return this.compile(navbaritemTemplate, this.props);
  }
}
