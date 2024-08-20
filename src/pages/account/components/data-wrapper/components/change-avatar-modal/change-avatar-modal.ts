import Block from "../../../../../../../utils/Block";
import "./change-avatar-modal.scss";
import template from "./change-avatar-modal.hbs";
import Input from "../../../../../../components/input/input";
import Button from "../../../../../../components/button/button";
import AccountService from "../../../../../../../services/AccountService/AccountService";

export default class ChangeAvatarModal extends Block {
  showModal() {
    this.setProps({
      ...this.props,
      attributes: {
        class: "wrapper wrapper_show",
      },
    });
  }
  closeModal() {
    this.setProps({
      ...this.props,
      attributes: {
        class: "wrapper",
      },
    });
  }
  constructor(onUpdateAvatar: Function) {
    super("div", {
      attributes: {
        class: `wrapper`,
      },
      title: "Загрузите файл",
      file: null,
      fileInput: new Input({
        type: "file",
        name: "file",
        accept: "image/png, image/jpeg",
        required: true,
        events: {
          change: (e: any) => {
            this.setProps({
              ...this.props,
              file: e.target.files[0],
              inputText: e.target.files[0].name,
            });
          },
        },
      }),
      inputText: "Выбрать файл на компьютере",
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          AccountService.changeAvatar({ file: this.props.file }).then(
            result => {
              this.closeModal();
              onUpdateAvatar(result);
            }
          );
        },
        click: (e: Event) => {
          e.stopPropagation();
          if ((e.target as HTMLDivElement).className.indexOf("wrapper") != -1) {
            this.closeModal();
          }
        },
      },
      submitButton: new Button({
        class: "button_primary",
        text: "Применить",
      }),
    });
  }

  public render(): Node {
    return this.compile(template, this.props);
  }
}
