import Block from "../../../../../utils/Block";
import Image from "../../../../components/image/image";
import ChatList from "./components/chat-list/chat-list";
import ChatListItem from "./components/chat-list/components/chat-list-item/chat-list-item";
import Header from "./components/header/header";
import leftColumTemplate from "./left-column.hbs";
import "./left-column.scss";
import avatarImage from "../../../../../static/circle.svg";

export default class LeftColumn extends Block {
  constructor() {
    super("div", {
      attributes: { class: "chats-grid__left-column" },
      header: new Header(),
      chatList: new ChatList([
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "Андрей",
          contentText: "Изображение",
          date: "11:12",
          unreadCount: 1,
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "Киноклуб",
          contentText: "стикер",
          date: "12:00",
          isMyMessage: true,
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "Илья",
          contentText: "Друзья, у меня для вас особенный выпуск новостей!..",
          date: "11:12",
          unreadCount: 4,
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "Вадим",
          contentText: "Круто!",
          date: "Пт",
          isMyMessage: true,
          isActive: true,
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "тет-а-теты",
          contentText:
            "И Human Interface Guidelines и Material Design рекомендуют...",
          date: "Ср",
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "1, 2, 3",
          contentText:
            "Миллионы россиян ежедневно проводят десятки часов свое...",
          date: "Пн",
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "Design Destroyer",
          contentText: "В 2008 году художник Jon Rafman  начал собирать...",
          date: "Пн",
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "Day.",
          contentText:
            "Так увлёкся работой по курсу, что совсем забыл его анонсир...",
          date: "1 Мая 2024",
        }),
        new ChatListItem({
          avatarImage: new Image({
            alt: "Автар пользователя",
            class: "item__image",
            source: avatarImage,
          }),
          contactName: "Стас Рогозин",
          contentText: "Можно или сегодня или завтра вечером.",
          date: "12 Апр 2024",
        }),
      ]),
    });
  }

  public render(): Node {
    return this.compile(leftColumTemplate, this.props);
  }
}
