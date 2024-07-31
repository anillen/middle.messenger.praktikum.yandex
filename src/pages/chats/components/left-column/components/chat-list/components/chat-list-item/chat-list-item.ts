import Block from "../../../../../../../../../utils/Block";
import Image from "../../../../../../../../components/image/image";
import chatListItemTemplate from "./chat-list-item.hbs";
import "./chat-list-item.scss";

interface ChatListItemProperties {
  avatarImage: Image;
  isActive?: boolean;
  contactName: string;
  isMyMessage?: boolean;
  contentText: string;
  date: string;
  unreadCount?: number;
}

export default class ChatListItem extends Block {
  constructor(chatListItemProps: ChatListItemProperties) {
    super("li", {
      ...chatListItemProps,
      isMyMessage: chatListItemProps.isMyMessage ?? false,
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
