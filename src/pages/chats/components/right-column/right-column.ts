import Block from "../../../../../utils/Block";
import HeaderContact from "./components/header/components/header-contact/header-contact";
import Header from "./components/header/header";
import rightColumnTemplate from "./right-column.hbs";
import Image from "../../../../components/image/image";
import MessageList from "./components/message-list/message-list";
import MessageListItem from "./components/message-list/components/message-list-item/message-list-item";
import MessageActions from "./components/message-actions/message-actions";
import "./right-column.scss";

export default class RightColumn extends Block {
  constructor() {
    super("div", {
      attributes: { class: "chats-grid__right-column" },
      header: new Header({
        headerContact: new HeaderContact({
          imageContact: new Image({
            alt: "Аватар пользователя",
            class: "contact-wrapper__image",
            source: "/static/circle.svg",
          }),
          name: "Вадим",
        }),
      }),
      messageList: new MessageList([
        new MessageListItem({
          text: `Привет! Смотри, тут всплыл интересный кусок лунной космической
          истории — НАСА в какой-то момент попросила Хассельблад адаптировать
          модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты
          летали с моделью 500 EL — и к слову говоря, все тушки этих камер все
          еще находятся на поверхности Луны, так как астронавты с собой забрали
          только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для
          космоса, но что-то пошло не так и наракету они так никогда и не
          попали. Всего их было произведено 25 штук, одну из них недавно продали
          на аукционе за 45000 евро.`,
          date: "11:56",
        }),
        new MessageListItem({
          image: new Image({
            alt: "Изображение",
            class: "item__image",
            source: "/static/message-image.jpg",
          }),
          date: "11:56",
        }),
        new MessageListItem({
          text: "Круто!",
          isMyMessage: true,
          date: "12:01",
        }),
      ]),
      messageActions: new MessageActions(),
    });
  }
  public render(): Node {
    return this.compile(rightColumnTemplate, this.props);
  }
}
