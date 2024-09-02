import Block from "../../../../../utils/Block/Block";
import Header from "./components/header/header";
import rightColumnTemplate from "./right-column.hbs";
import "./right-column.scss";
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
