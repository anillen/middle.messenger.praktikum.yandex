import "./main.scss";
import AuthService from "./services/AuthService/AuthService";
import Accounts from "./src/pages/account/account";
import Chats from "./src/pages/chats/chats";
import ErrorPage from "./src/pages/error/error";
import Login from "./src/pages/login/login";
import Registration from "./src/pages/registration/registration";
import Router from "./utils/Router/Router";

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("main");
  router.onRoute = router => {
    if (router.isPrivate && !AuthService.isAuthenticate) {
      return false;
    }
    return true;
  };
  router
    .use("/", Login)
    .use("/sign-up", Registration)
    .use("/settings", Accounts, true)
    .use("/messenger", Chats, true)
    .use("/error/404", ErrorPage)
    .use("/error/500", ErrorPage)
    .start();
});
