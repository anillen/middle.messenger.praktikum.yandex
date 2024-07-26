import Block from "../../../../../../../utils/Block";
import HeaderContact from "./components/header-contact/header-contact";
import Button from "../../../../../../components/button/button";
import headerTemplate from "./header.hbs";
import "./header.scss";
import menuImage from "../../../../../../../static/menu.svg";

class HeaderProperties {
  headerContact: HeaderContact;
}

export default class Header extends Block {
  constructor(props: HeaderProperties) {
    super("div", {
      ...props,
      attributes: {
        class: "right-column__header",
      },
      menuButton: new Button({
        image: menuImage,
      }),
    });
  }
  public render(): Node {
    return this.compile(headerTemplate, this.props);
  }
}
