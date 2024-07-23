import "./login.scss";
import { render } from "../../../utils/renderDOM";
import LoginForm from "./components/login-form/login-form";
import loginTemplate from "./login.hbs";

const form = new LoginForm();

document.addEventListener("DOMContentLoaded", () => {
  render("main", form);
});
