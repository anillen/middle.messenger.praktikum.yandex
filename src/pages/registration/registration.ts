import RegisterForm from "./components/register-form/register-form";
import "./registration.scss";
import { render } from "../../../utils/renderDOM";

const form = new RegisterForm();

document.addEventListener("DOMContentLoaded", () => {
  render("main", form);
});
