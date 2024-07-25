import Block from "../../../../../utils/Block";
import "./account-form.scss";
import accountFormTemplate from "./account-form.hbs";
import Image from "../../../../components/image/image";

class AccountFormProperties {
  dataWrapper: Block;
  actionsWrapper: Block;
  submitFormHandler: Function;
}

export default class AccountFrom extends Block {
  constructor(props: AccountFormProperties) {
    super("form", {
      ...props,
      attributes: { class: "account-container__profile" },
      avatarImage: new Image({
        alt: "Аватар",
        source: "/static/image-icon.svg",
        class: "avatar__image",
      }),
      events: {
        submit: props.submitFormHandler,
      },
    });
  }

  public render(): Node {
    return this.compile(accountFormTemplate, this.props);
  }
}
