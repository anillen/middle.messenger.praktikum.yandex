import "./chats.scss";
import Block from "../../../utils/Block";
import chatsTemplate from "./chats.hbs";
import LeftColumn from "./components/left-column/left-column";
import RightColumn from "./components/right-column/right-column";
import Modal from "./components/modal/modal";

const modal = new Modal();

const leftColumn = new LeftColumn();

export default class Chats extends Block {
  showModal(modal: Modal) {
    this.setProps({
      ...this.props,
      modal: modal,
    });
    modal.setIsShowModal(true);
  }

  constructor() {
    super("div", {
      attributes: { class: "chats-grid" },
      leftColumn: leftColumn,
      rightColumn: new RightColumn(modal),
      modal: modal,
    });
  }

  public render(): Node {
    return this.compile(chatsTemplate, this.props);
  }
}
