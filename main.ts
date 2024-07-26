import NavbarItem from "./components/navbar/components/navbar-item/navbar-item";
import Navbar from "./components/navbar/navbar";
import "./main.scss";
import Accounts from "./src/pages/account/account";
import Chats from "./src/pages/chats/chats";
import ErrorPage from "./src/pages/error/error";
import Login from "./src/pages/login/login";
import Registration from "./src/pages/registration/registration";
import { render } from "./utils/renderDOM";

const navbar = new Navbar({
  loginLink: new NavbarItem({
    linkTo: "/login",
    text: "Авторизация",
  }),
  registerLink: new NavbarItem({
    linkTo: "/registration",
    text: "Регистрация",
  }),
  chatsLink: new NavbarItem({
    linkTo: "/chats",
    text: "Чаты",
  }),
  profileLink: new NavbarItem({
    linkTo: "/account",
    text: "Профиль",
  }),
  notFoundLink: new NavbarItem({
    linkTo: "/error/404",
    text: "404",
  }),
  errorLink: new NavbarItem({
    linkTo: "/error/500",
    text: "500",
  }),
});

document.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "/":
      return render("main", navbar);
    case "/login":
      return render("main", new Login());
    case "/registration":
      return render("main", new Registration());
    case "/chats":
      return render("main", new Chats());
    case "/account":
      return render("main", new Accounts());
    case "/error/500":
      return render("main", new ErrorPage(500));
    default:
      return render("main", new ErrorPage(404));
  }
});
