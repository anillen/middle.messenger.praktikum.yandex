import Block from "../../../../../../../../../utils/Block";
import Image from "../../../../../../../../components/image/image";
import messageListItemTemplate from "./message-list-item.hbs";
import "./message-list-item.scss";

class MessageListItemProperties {
  isMyMessage?: boolean = false;
  image?: Image;
  text?: string;
  date: string;
}

export default class MessageListItem extends Block {
  constructor(props: MessageListItemProperties) {
    super("div", {
      ...props,
      attributes: {
        class: `message-list__wrapper ${
          props.isMyMessage ? "message-list__wrapper_my-message" : ""
        }`,
      },
    });
  }

  public render(): Node {
    return this.compile(messageListItemTemplate, this.props);
  }
}
