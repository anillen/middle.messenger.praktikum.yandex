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
import ChatStore from "../../../../../store/ChatStore";

export default class RightColumn extends Block {
  constructor(modal: Modal) {
    super("div", {
      attributes: { class: "chats-grid__right-column" },
      header: new Header({
        headerContact: null,
        modal: modal,
      }),
      listMessages: null,
      messageActions: null,
    });

    ChatStore.subscribe(this, "listMessages");
  }
  public render(): Node {
    return this.compile(rightColumnTemplate, this.props);
  }
}
