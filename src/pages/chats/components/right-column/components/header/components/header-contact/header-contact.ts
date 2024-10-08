import Block from "../../../../../../../../../utils/Block/Block";
import Image from "../../../../../../../../components/image/image";
import headerContactTemplate from "./header-contact.hbs";

interface HeaderContactProperties {
  imageContact: Image;
  name: string;
}

export default class HeaderContact extends Block {
  constructor(props: HeaderContactProperties) {
    super("div", {
      ...props,
      attributes: { class: "header__contact-wrapper" },
    });
  }

  public render(): Node {
    return this.compile(headerContactTemplate, this.props);
  }
}
