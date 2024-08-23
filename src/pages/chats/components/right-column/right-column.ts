import Block from "../../../../../utils/Block";
import HeaderContact from "./components/header/components/header-contact/header-contact";
import Header from "./components/header/header";
import rightColumnTemplate from "./right-column.hbs";
import Image from "../../../../components/image/image";
import MessageList from "./components/message-list/message-list";
import MessageActions from "./components/message-actions/message-actions";
import "./right-column.scss";
import avatarImage from "../../../../../static/circle.svg";
import Modal from "../modal/modal";

export default class RightColumn extends Block {
  constructor(modal: Modal) {
    super("div", {
      attributes: { class: "chats-grid__right-column" },
      header: new Header({
        headerContact: new HeaderContact({
          imageContact: new Image({
            alt: "Аватар пользователя",
            class: "contact-wrapper__image",
            source: avatarImage,
          }),
          name: "Вадим",
        }),
        modal: modal,
      }),
      messageList: new MessageList(),
      messageActions: new MessageActions(),
    });
  }
  public render(): Node {
    return this.compile(rightColumnTemplate, this.props);
  }
}
