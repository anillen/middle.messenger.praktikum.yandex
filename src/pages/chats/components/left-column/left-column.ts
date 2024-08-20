import Block from "../../../../../utils/Block";
import ChatList from "./components/chat-list/chat-list";
import Header from "./components/header/header";
import leftColumTemplate from "./left-column.hbs";
import "./left-column.scss";

export default class LeftColumn extends Block {
  constructor() {
    super("div", {
      attributes: { class: "chats-grid__left-column" },
      header: new Header(),
      chatList: new ChatList(),
      currentChatId: -1,
    });
  }

  public render(): Node {
    return this.compile(leftColumTemplate, this.props);
  }
}
