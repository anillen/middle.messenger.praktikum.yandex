import Block from "../../../../../../../utils/Block";
import HeaderContact from "./components/header-contact/header-contact";
import Button from "../../../../../../components/button/button";
import headerTemplate from "./header.hbs";
import "./header.scss";
import menuImage from "../../../../../../../static/menu.svg";
import Menu from "./components/menu/menu";
import Modal from "../../../modal/modal";

interface HeaderProperties {
  headerContact: HeaderContact;
  modal: Modal;
}

const menu = new Menu();

export default class Header extends Block {
  constructor(props: HeaderProperties) {
    menu.setProps({
      ...menu.props,
      other: {
        modal: props.modal,
      },
    });

    super("div", {
      headerContact: props.headerContact,
      attributes: {
        class: "right-column__header",
      },
      menuButton: new Button({
        image: menuImage,
        events: {
          click: () => {
            menu.setIsShow(!menu.props.isShow);
          },
        },
      }),
      menu: menu,
    });
  }
  public render(): Node {
    return this.compile(headerTemplate, this.props);
  }
}
