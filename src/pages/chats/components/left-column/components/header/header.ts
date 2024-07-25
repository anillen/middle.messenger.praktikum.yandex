import Block from "../../../../../../../utils/Block";
import templateHeader from "./header.hbs";
import Link from "../../../../../../components/link/link";
import Input from "../../../../../../components/input/input";
import Image from "../../../../../../components/image/image";
import "./header.scss";

export default class Header extends Block {
  constructor() {
    super("div", {
      attributes: { class: "left-column__header" },
      profileLink: new Link({
        text: "Профиль >",
        to: "../account/",
      }),
      searchInput: new Input({
        icon: new Image({
          alt: "Логотип поиска",
          class: "input__icon",
          source: "/static/search.svg",
        }),
        class: "primary-input",
      }),
    });
  }
  public render(): Node {
    return this.compile(templateHeader, this.props);
  }
}