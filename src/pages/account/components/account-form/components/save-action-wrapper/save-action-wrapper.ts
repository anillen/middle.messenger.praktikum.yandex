import Block from "../../../../../../../utils/Block";
import Button from "../../../../../../components/button/button";
import saveActionTemplate from "./save-action-wrapper.hbs";
import "./save-action-wrapper.scss";

export default class SaveActionWrapper extends Block {
  constructor() {
    super("div", {
      attributes: { class: "save-action" },
      saveButton: new Button({
        class: "button_primary",
        text: "Сохранить",
        type: "submit",
      }),
    });
  }
  public render(): Node {
    return this.compile(saveActionTemplate, this.props);
  }
}
