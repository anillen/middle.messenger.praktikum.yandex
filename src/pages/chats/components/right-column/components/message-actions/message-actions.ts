import Block from "../../../../../../../utils/Block";
import Button from "../../../../../../components/button/button";
import Input from "../../../../../../components/input/input";
import messageActionsTemplate from "./message-actions.hbs";
import "./message-actions.scss";
import GetFormData from "../../../../../../../utils/GetFormData";
import { MessageRegexp } from "../../../../../../../constants/Regexps";
import clipImage from "../../../../../../../static/clip.svg";
import sendButtonImage from "../../../../../../../static/arrow-right.svg";

const inputValidation = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    if (!MessageRegexp.test(e.target.value)) {
      e.target.setCustomValidity("Некорректное сообщение");
    } else {
      e.target.setCustomValidity("");
    }
  }
};

const messageInput = new Input({
  class: "primary-input",
  placeholder: "Сообщение",
  type: "text",
  name: "message",
  required: true,
  events: {
    change: inputValidation,
  },
});

const formSubmitHandler = (e: Event) => {
  e.preventDefault();
  console.log(GetFormData(e.target));
};

export default class MessageActions extends Block {
  constructor() {
    super("form", {
      attributes: {
        class: "right-column__message-actions",
      },
      clipButton: new Button({
        type: "button",
        image: clipImage,
      }),
      messageInput: messageInput,
      sendButton: new Button({
        image: sendButtonImage,
        class: "button_primary button_circle",
      }),
      events: {
        submit: formSubmitHandler,
      },
    });
  }
  public render(): Node {
    return this.compile(messageActionsTemplate, this.props);
  }
}
