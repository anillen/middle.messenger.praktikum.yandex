import Block from "../../../../../../../../../utils/Block";
import Image from "../../../../../../../../components/image/image";
import chatListItemTemplate from "./chat-list-item.hbs";
import "./chat-list-item.scss";

class ChatListItemProperties {
  avatarImage: Image;
  isActive?: boolean = false;
  contactName: string;
  isMyMessage?: boolean = false;
  contentText: string;
  date: string;
  unreadCount?: number;
}

export default class ChatListItem extends Block {
  constructor(chatListItemProps: ChatListItemProperties) {
    super("li", {
      ...chatListItemProps,
      attributes: {
        class: `chat-list__item ${
          chatListItemProps?.isActive ? "chat-list__item_active" : ""
        }`,
      },
    });
  }

  public render(): Node {
    return this.compile(chatListItemTemplate, this.props);
  }
}
