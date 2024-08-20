import "./error.scss";
import Block from "../../../utils/Block";
import Link from "../../components/link/link";
import errorPageTemplate from "./error.hbs";

export default class ErrorPage extends Block {
  constructor() {
    let splitArray = window.location.pathname.split("/");
    const statusCode = Number(splitArray[splitArray.length-1]);

    let title = "Ошибка, над которой мы уже работаем :)";
    switch (statusCode) {
      case 404:
        title = "Потерялись?";
    }
    super("div", {
      attributes: { class: "container-center" },
      statusCode: statusCode,
      title: title,
      link: new Link({ text: "Назад к чатам", to: "/messenger", class: "link_primary error-link" }),
    });
  }
  public render(): Node {
    return this.compile(errorPageTemplate, this.props);
  }
}
