import Block from "../../../../../../../utils/Block";
import templateHeader from "./header.hbs";
import "./header.scss";
import SearchInput from "./search-input/search-input";
import Router from "../../../../../../../utils/Router";
import Button from "../../../../../../components/button/button";

const router = new Router("main");

export default class Header extends Block {
  constructor() {
    super("div", {
      attributes: { class: "left-column__header" },
      profileLink: new Button({
        text: "Профиль >",
        events: {
          click: () => router.go("/settings"),
        },
      }),
      searchInput: new SearchInput(),
    });
  }
  public render(): Node {
    return this.compile(templateHeader, this.props);
  }
}
