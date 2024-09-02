import AuthService from "../../../../../../../services/AuthService/AuthService";
import Block from "../../../../../../../utils/Block/Block";
import Router from "../../../../../../../utils/Router/Router";
import Button from "../../../../../../components/button/button";
import actionsWrapperTemplate from "./actions-wrapper.hbs";

const router = new Router("main");

export default class ActionsWrapper extends Block {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(switchDataHandler: Function, switchPasswordHandler: Function) {
    super("div", {
      attributes: { class: "card__actions-wrapper" },
      editDataButton: new Button({
        class: "button_primary-color",
        text: "Изменить данные",
        type: "button",
        events: {
          click: switchDataHandler,
        },
      }),
      editPasswordButton: new Button({
        class: "button_primary-color",
        text: "Изменить пароль",
        type: "button",
        events: {
          click: switchPasswordHandler,
        },
      }),
      exitButton: new Button({
        class: "button_red-color",
        text: "Выйти",
        type: "button",
        events: {
          click: () => {
            AuthService.Logout();
            router.go("/");
          },
        },
      }),
    });
  }

  public render(): Node {
    return this.compile(actionsWrapperTemplate, this.props);
  }
}
