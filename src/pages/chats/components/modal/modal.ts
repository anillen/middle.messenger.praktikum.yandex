import Block from "../../../../../utils/Block/Block";
import template from "./modal.hbs";
import "./modal.scss";

interface ModalProps {
  title: string;
  body: Block;
  actions: Block;
  isShow: boolean;
  events: object;
  errorMessage: string | null;
}

export default class Modal extends Block {
  setIsShowModal(isShow: boolean) {
    this.setProps({
      ...this.props,
      attributes: {
        class: `modal-wrapper ${isShow && "modal-wrapper_show"}`,
      },
      errorMessage: null,
    });
  }

  setError(errorMessage: string) {
    this.setProps({
      ...this.props,
      errorMessage: errorMessage,
    });
  }

  constructor(props: ModalProps | null = null) {
    super("form", {
      attributes: {
        class: "modal-wrapper",
      },
      isShow: false,
      title: props?.title,
      body: props?.body,
      actions: props?.actions,
      events: {
        ...props?.events,
        click: (e: Event) => {
          e.stopPropagation();
          if ((e.target as HTMLDivElement).className.indexOf("wrapper") != -1) {
            this.setIsShowModal(false);
          }
        },
      },
      errorMessage: null,
    });
  }

  public render(): Node {
    return this.compile(template, this.props);
  }
}
