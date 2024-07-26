import Block from "../../../../../../../utils/Block";
import MessageListItem from "./components/message-list-item/message-list-item";
import Handlebars from "handlebars";
import "./message-list.scss";

export default class MessageList extends Block {
  constructor(messages: Array<MessageListItem>) {
    super("div", {
      messages: messages,
      attributes: { class: "right-column__message-list" },
    });
  }
  public render(): Node {
    let template: string = "";
    template += `<p class="message-list__date">19 июля</p>`;
    this.props.messages.forEach((chat, index) => {
      template += `{{{messages${index}}}} `;
    });

    return this.compile(Handlebars.compile(template), this.props);
  }
}
