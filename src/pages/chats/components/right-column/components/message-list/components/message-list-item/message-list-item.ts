import Block from "../../../../../../../../../utils/Block";
import Image from "../../../../../../../../components/image/image";
import messageListItemTemplate from "./message-list-item.hbs";
import "./message-list-item.scss";
import readedImage from "../../../../../../../../../static/readed.svg";
interface MessageListItemProperties {
  isMyMessage?: boolean;
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
      imageSource: readedImage,
    });
  }

  public render(): Node {
    return this.compile(messageListItemTemplate, this.props);
  }
}
