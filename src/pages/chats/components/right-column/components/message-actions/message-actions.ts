import Block from "../../../../../../../utils/Block/Block";
import Button from "../../../../../../components/button/button";
import Input from "../../../../../../components/input/input";
import messageActionsTemplate from "./message-actions.hbs";
import "./message-actions.scss";
import { MessageRegexp } from "../../../../../../../constants/Regexps";
import clipImage from "../../../../../../../static/clip.svg";
import sendButtonImage from "../../../../../../../static/arrow-right.svg";
import GetFormData from "../../../../../../../utils/GetFormData";
import WebSocketService from "../../../../../../../services/WebSocketService/WebSocketService";

interface SendMessageModel {
  message: string;
}

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
  const element = e.target as HTMLInputElement;
  element.value = "";
  WebSocketService.sendMessage(GetFormData<SendMessageModel>(element).message);
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
