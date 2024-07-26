import "./chats.scss";
import Block from "../../../utils/Block";
import chatsTemplate from "./chats.hbs";
import LeftColumn from "./components/left-column/left-column";
import RightColumn from "./components/right-column/right-column";

export default class Chats extends Block {
  constructor() {
    super("div", {
      attributes: { class: "chats-grid" },
      leftColumn: new LeftColumn(),
      rightColumn: new RightColumn(),
    });
  }

  public render(): Node {
    return this.compile(chatsTemplate, this.props);
  }
}
