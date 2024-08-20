import Block from "../../../../../../../../../utils/Block";
import "./menu.scss";
import template from "./menu.hbs";
import Button from "../../../../../../../../components/button/button";
import Input from "../../../../../../../../components/input/input";
import GetFormData from "../../../../../../../../../utils/GetFormData";
import CreateChatModel from "../../../../../../../../../services/ChatService/models/CreateChatModel";
import ChatService from "../../../../../../../../../services/ChatService/ChatService";
import Modal from "../../../../../modal/modal";
import AccountService from "../../../../../../../../../services/AccountService/AccountService";
import ChatStore from "../../../../../../../../../store/ChatStore";

interface AddUserInChatModel {
  login: string;
}

export default class Menu extends Block {
  setIsShow(isShow: boolean) {
    this.setProps({
      ...this.props,
      isShow: isShow,
    });
    if (this.props.isShow) {
      this.setProps({
        ...this.props,
        attributes: {
          class: "menu menu_show",
        },
      });
    } else {
      this.setProps({
        ...this.props,
        attributes: {
          class: "menu",
        },
      });
    }
  }

  constructor() {
    super("div", {
      attributes: {
        class: "menu",
      },
      other: {
        modal: null,
      },
      currentChatId: null,
      isShow: false,
      addChatButton: new Button({
        image: "/static/add-chat.svg",
        text: "Создать чат",
        class: "button_menu",
        events: {
          click: () => {
            const modal = this.props.other.modal as Modal;
            modal.setProps({
              title: "Введите название чата",
              body: new Input({
                name: "title",
                required: true,
              }),
              actions: new Button({
                text: "Применить",
                class: "button_primary",
                type: "submit",
              }),
              events: {
                submit: (e: Event) => {
                  e.preventDefault();
                  ChatService.createChat(
                    GetFormData<CreateChatModel>(e.target)
                  ).then(() => {
                    modal.setIsShowModal(false);
                  });
                },
              },
            });
            modal.setIsShowModal(true);
          },
        },
      }),
      addUserButton: new Button({
        image: "/static/add-user.svg",
        text: "Добавить пользователя",
        class: "button_menu",
        events: {
          click: () => {
            const modal = this.props.other.modal as Modal;
            modal.setProps({
              title: "Введите логин пользователя",
              body: new Input({
                name: "login",
                required: true,
              }),
              actions: new Button({
                text: "Применить",
                class: "button_primary",
                type: "submit",
              }),
              events: {
                submit: (e: Event) => {
                  e.preventDefault();

                  if (this.props.currentChatId == null) {
                    modal.setError("Не выбран чат");
                    return;
                  }

                  const formData = GetFormData<AddUserInChatModel>(e.target);
                  AccountService.searchUserByLogin(formData.login).then(
                    result => {
                      if(result.length==0){
                        modal.setError("Не найдено ни одного пользователя");
                        return;
                      }
                      ChatService.addUsersInChat(
                        result.map(user => user.id),
                        this.props.currentChatId
                      ).then(() => {
                        modal.setIsShowModal(false);
                      });
                    }
                  );
                },
              },
            });
            modal.setIsShowModal(true);
          },
        },
      }),
      removeUserButton: new Button({
        image: "/static/delete-user.svg",
        text: "Удалить пользователя",
        class: "button_menu",
        events: {
          click: () => {
            const modal = this.props.other.modal as Modal;
            modal.setProps({
              title: "Введите логин пользователя",
              body: new Input({
                name: "login",
                required: true,
              }),
              actions: new Button({
                text: "Применить",
                class: "button_primary",
                type: "submit",
              }),
              events: {
                submit: (e: Event) => {
                  e.preventDefault();

                  if (this.props.currentChatId == null) {
                    modal.setError("Не выбран чат");
                    return;
                  }

                  const formData = GetFormData<AddUserInChatModel>(e.target);
                  AccountService.searchUserByLogin(formData.login).then(
                    result => {
                      if(result.length==0){
                        modal.setError("Не найдено ни одного пользователя");
                        return;
                      }
                      ChatService.deleteUsersInChat(
                        result.map(user => user.id),
                        this.props.currentChatId
                      ).then(() => {
                        modal.setIsShowModal(false);
                      });
                    }
                  );
                },
              },
            });
            modal.setIsShowModal(true);
          },
        },
      }),
      removeChatButton: new Button({
        image: "/static/delete-chat.svg",
        text: "Удалить чат",
        class: "button_menu",
      }),
    });

    ChatStore.subscribe(this);
  }

  public render(): Node {
    return this.compile(template, this.props);
  }
}