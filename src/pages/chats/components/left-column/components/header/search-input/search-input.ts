import Block from "../../../../../../../../utils/Block";
import Image from "../../../../../../../components/image/image";
import Input from "../../../../../../../components/input/input";
import searchInputTemplate from "./search-input.hbs";
import "./search-input.scss";
import searchIcon from "../../../../../../../../static/search.svg";

export default class SearchInput extends Block {
  constructor() {
    super("div", {
      attributes: {
        class: "input-container",
      },
      icon: new Image({
        alt: "Иконка поиска",
        source: searchIcon,
        class: "input__icon",
      }),
      input: new Input({
        class: "input_icon primary-input",
      }),
    });
  }
  public render(): Node {
    return this.compile(searchInputTemplate, this.props);
  }
}
