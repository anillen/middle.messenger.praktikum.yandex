import NavbarItem from "./components/navbar/components/navbar-item/navbar-item";
import Navbar from "./components/navbar/navbar";
import "./main.scss";
import { render } from "./utils/renderDOM";

const navbar = new Navbar({
  loginLink: new NavbarItem({
    linkTo: "./src/pages/login/",
    text: "Авторизация",
  }),
  registerLink: new NavbarItem({
    linkTo: "./src/pages/registration/",
    text: "Регистрация",
  }),
  chatsLink: new NavbarItem({
    linkTo: "./src/pages/chats/",
    text: "Чаты",
  }),
  profileLink: new NavbarItem({
    linkTo: "./src/pages/account/",
    text: "Профиль",
  }),
  notFoundLink: new NavbarItem({
    linkTo: "./src/pages/error/notFound.html",
    text: "404",
  }),
  errorLink: new NavbarItem({
    linkTo: "./src/pages/error/serverError.html",
    text: "500",
  }),
});

render(".container-center", navbar);
