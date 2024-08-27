import Block from "../../../../../../../utils/Block";
import Handlebars from "handlebars";
import "./message-list.scss";
import MessageListItem from "./components/message-list-item/message-list-item";

export default class MessageList extends Block {
  constructor(listMessage: Array<MessageListItem>) {
    super("div", {
      attributes: { class: "right-column__message-list" },
      listMessages: listMessage,
    });
  }
  public render(): Node {
    let template: string = "";
    if (
      this.props.listMessages == null ||
      this.props.listMessages?.length == 0
    ) {
      template = "<p>Сообщений нет, будь первым!</p>";
    } else {
      this.props.listMessages?.forEach((_chat: Block, index: number) => {
        template += `{{{listMessages${index}}}} `;
      });
    }
    return this.compile(Handlebars.compile(template), this.props);
  }
}
