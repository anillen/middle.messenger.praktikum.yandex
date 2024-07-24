import Block from "../../../../../../../utils/Block";
import Button from "../../../../../../components/button/button";
import Input from "../../../../../../components/input/input";
import messageActionsTemplate from "./message-actions.hbs";
import "./message-actions.scss";

export default class MessageActions extends Block {
  constructor() {
    super("div", {
      attributes: {
        class: "right-column__message-actions",
      },
      clipButton: new Button({
        image: "/static/clip.svg",
      }),
      messageInput: new Input({
        class: "primary-input",
        placeholder: "Сообщение",
        type: "text",
        name: "message",
      }),
      sendButton: new Button({
        image: "/static/arrow-right.svg",
        class: "button_primary button_circle"
      }),
    });
  }
  public render(): Node {
    return this.compile(messageActionsTemplate, this.props);
  }
}
