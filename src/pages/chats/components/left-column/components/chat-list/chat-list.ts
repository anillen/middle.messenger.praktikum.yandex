import Block from "../../../../../../../utils/Block/Block";
import ChatListItem from "./components/chat-list-item/chat-list-item";
import Handlebars from "handlebars";
import "./chat-list.scss";
import ChatService from "../../../../../../../services/ChatService/ChatService";
import Image from "../../../../../../components/image/image";
import ChatStore from "../../../../../../../store/ChatStore";
import circleImage from "../../../../../../../static/circle.svg";
import BaseURL from "../../../../../../../constants/BaseURL";

export default class ChatList extends Block {
  updateChatList() {
    ChatService.getChats().then(result => {
      ChatStore.setChatList(
        result?.map(item => {
          const date =
            item.last_message != null
              ? new Date(item.last_message.time).toLocaleTimeString()
              : "";

          let chatItem = new ChatListItem({
            id: item.id,
            avatarImage: new Image({
              alt: item.avatar ?? circleImage,
              source: item.avatar
                ? `${BaseURL}/resources/${item.avatar}`
                : circleImage,
              class: "item__image",
            }),
            contactName: item.title,
            contentText: item.last_message?.content ?? "",
            date: date,
            unreadCount: item.unread_count,
            isActive: false,
            events: {
              click: () => {
                this.props.listChats.forEach((chat: ChatListItem) => {
                  if (item.id == chat.props.id) {
                    chat.setIsActive(true);
                    ChatStore.setCurrentChatId(item.id);
                  } else {
                    if (chat.props.isActive) {
                      chat.setIsActive(false);
                    }
                  }
                });
              },
            },
          });
          return chatItem;
        })
      );
    });
  }

  constructor() {
    super("ul", {
      attributes: {
        class: "left-column__chat-list",
      },
      chats: null,
    });
    ChatStore.subscribe(this, "listChats");
    ChatStore.subscribe(this, "updateListChat");
    this.updateChatList();
  }
  public render(): Node {
    let template: string = "";

    if (!this.props.listChats) {
      template = "Пожалуйста подождите...";
    }
    if (this.props.listChats?.length == 0) {
      template = "Список чатов пуст";
    }
    this.props.listChats?.forEach((_chat: Block, index: number) => {
      template += `{{{listChats${index}}}} `;
    });

    return this.compile(Handlebars.compile(template), this.props);
  }
}
