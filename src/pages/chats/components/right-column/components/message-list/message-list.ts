import Block from "../../../../../../../utils/Block";
import Handlebars from "handlebars";
import "./message-list.scss";
import ChatStore from "../../../../../../../store/ChatStore";

export default class MessageList extends Block {
  constructor() {
    super("div", {
      attributes: { class: "right-column__message-list" },
    });

    ChatStore.subscribe(this, "listMessages");
  }
  public render(): Node {
    let template: string = "";

    if (!this.props.currentChatId) {
      template = "<p>Не выбран чат</p>";
    } else if (this.props.listMessages?.length == 0) {
      template = "<p>Сообщений нет, будь первым!</p>";
    }

    // template += `<p class="message-list__date">19 июля</p>`;
    this.props.listMessages?.forEach((_chat: Block, index: number) => {
      template += `{{{messages${index}}}} `;
    });

    return this.compile(Handlebars.compile(template), this.props);
  }
}
