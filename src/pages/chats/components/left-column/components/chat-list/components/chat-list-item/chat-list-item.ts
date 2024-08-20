import Block from "../../../../../../../../../utils/Block";
import Image from "../../../../../../../../components/image/image";
import chatListItemTemplate from "./chat-list-item.hbs";
import "./chat-list-item.scss";

interface ChatListItemProperties {
  id: number;
  avatarImage: Image;
  isActive?: boolean;
  contactName: string;
  isMyMessage?: boolean;
  contentText: string;
  date: string;
  unreadCount?: number;
  events: any;
}

export default class ChatListItem extends Block {
  setIsActive(isActive: boolean) {
    this.setProps({
      ...this.props,
      attributes: {
        class: `chat-list__item ${isActive && "chat-list__item_active"}`,
      },
      isActive: isActive,
    });
  }
  constructor(chatListItemProps: ChatListItemProperties) {
    super("li", {
      ...chatListItemProps,
      isMyMessage: chatListItemProps.isMyMessage ?? false,
      attributes: {
        class: "chat-list__item",
      },
    });
  }

  public render(): Node {
    return this.compile(chatListItemTemplate, this.props);
  }
}
