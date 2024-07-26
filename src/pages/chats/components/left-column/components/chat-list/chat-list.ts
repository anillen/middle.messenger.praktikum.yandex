import Block from "../../../../../../../utils/Block";
import ChatListItem from "./components/chat-list-item/chat-list-item";
import Handlebars from "handlebars";
import "./chat-list.scss";

export default class ChatList extends Block {
  constructor(chats: Array<ChatListItem>) {
    super("ul", {
      attributes: {
        class: "left-column__chat-list",
      },
      chats: chats,
    });
  }
  public render(): Node {
    let template: string = "";

    this.props.chats.forEach((chat, index) => {
      template += `{{{chats${index}}}} `;
    });

    return this.compile(Handlebars.compile(template), this.props);
  }
}
