import Handlebars from "handlebars";

import "./account.scss";

import { switchPasswordContainer } from "./components/switch-password-container/switch-password-container";
import input from "./components/input/input.hbs";
import button from "../../components/button/button.hbs";

Handlebars.registerPartial("input", input);
Handlebars.registerPartial("button", button);

document.addEventListener("DOMContentLoaded", () => {
  const switchPasswordButtons = document.getElementsByName(
    "switch-password-button"
  );
  const switchDataButtons = document.getElementsByName("switch-data-button");

  switchDataButtons[0].addEventListener("click", () => {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute("disabled");
    }
    _saveMode();
  });

  switchPasswordButtons[0].addEventListener("click", () => {
    const dataWrapper = document.getElementById("data-wrapper");
    dataWrapper!.innerHTML = Handlebars.compile(switchPasswordContainer)({});
    _saveMode();
  });
  
});

function _saveMode() {
  const actionsWrapper = document.getElementById("actions-wrapper");
  actionsWrapper!.innerHTML = Handlebars.compile("{{>button}}")({
    class: "button_primary",
    text: "Сохранить",
  });
  actionsWrapper!.className += " card__actions-wrapper_center";
}
