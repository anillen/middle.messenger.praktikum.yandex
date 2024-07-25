import "./back-sidebar.scss";
import Block from "../../../utils/Block";
import Button from "../button/button";
import backSideBarTemplate from "./back-sidebar.hbs";

export default class BackSidebar extends Block {
  constructor() {
    super("div", {
      attributes: { class: "back-sidebar" },
      backButton: new Button({
        class: "button_primary button_circle",
        image: "/static/arrow-left.svg",
      }),
    });
  }
  public render(): Node {
    return this.compile(backSideBarTemplate, this.props);
  }
}
