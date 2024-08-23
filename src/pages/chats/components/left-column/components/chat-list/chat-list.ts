import Block from "../../../../../../../utils/Block";
import ChatListItem from "./components/chat-list-item/chat-list-item";
import Handlebars from "handlebars";
import "./chat-list.scss";
import ChatService from "../../../../../../../services/ChatService/ChatService";
import Image from "../../../../../../components/image/image";
import ChatStore from "../../../../../../../store/ChatStore";
import circleImage from "../../../../../../../static/circle.svg";

export default class ChatList extends Block {
  constructor() {
    ChatService.getChats().then(result => {
      if (result.length > 0) {
        this.setProps({
          ...this.props,
          chats: result.map(item => {
            return new ChatListItem({
              id: item.id,
              avatarImage: new Image({
                alt: item.avatar ?? circleImage,
                source: item.avatar
                  ? `https://ya-praktikum.tech/api/v2/resources/${item.avatar}`
                  : circleImage,
                class: "item__image",
              }),
              contactName: item.title,
              contentText: item.last_message?.content ?? "",
              date: item.last_message?.time.toLocaleDateString() ?? "",
              unreadCount: item.unread_count,
              isActive: false,
              events: {
                click: () => {
                  this.props.chats.forEach((chat: ChatListItem) => {
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
          }),
        });
      }
    });

    super("ul", {
      attributes: {
        class: "left-column__chat-list",
      },
      chats: null,
    });
  }
  public render(): Node {
    let template: string = "";

    if (!this.props.chats) {
      template = "Пожалуйста подождите...";
    }
    if (this.props.chats?.length == 0) {
      template = "Список чатов пуст";
    }
    this.props.chats?.forEach((_chat: Block, index: number) => {
      template += `{{{chats${index}}}} `;
    });

    return this.compile(Handlebars.compile(template), this.props);
  }
}
