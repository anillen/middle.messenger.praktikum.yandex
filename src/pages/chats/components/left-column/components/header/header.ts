import Block from "../../../../../../../utils/Block";
import templateHeader from "./header.hbs";
import Link from "../../../../../../components/link/link";
import "./header.scss";
import SearchInput from "./search-input/search-input";

export default class Header extends Block {
  constructor() {
    super("div", {
      attributes: { class: "left-column__header" },
      profileLink: new Link({
        text: "Профиль >",
        to: "../account/",
      }),
      searchInput: new SearchInput(),
    });
  }
  public render(): Node {
    return this.compile(templateHeader, this.props);
  }
}
