import Block from "../../../utils/Block";
import "./account.scss";
import accountsTemplate from "./account.hbs";
import { render } from "../../../utils/renderDOM";
import BackSidebar from "../../components/back-sidebar/back-sidebar";
import AccountFrom from "./components/account-form/account-form";
import DataWrapper from "./components/account-form/components/data-wrapper/data-wrapper";
import ActionsWrapper from "./components/account-form/components/actions-wrapper/actions-wrapper";
import SaveActionWrapper from "./components/account-form/components/save-action-wrapper/save-action-wrapper";
import GetFormData from "../../../utils/GetFormData";
import SwitchPasswordWrapper from "./components/account-form/components/switch-password-wrapper/switch-password-wrapper";

const switchDataHandler = () => {
  accountForm.setProps({
    actionsWrapper: new SaveActionWrapper(),
    dataWrapper: new DataWrapper(false),
  });
};

const switchPasswordHandler = () => {
  accountForm.setProps({
    actionsWrapper: new SaveActionWrapper(),
    dataWrapper: new SwitchPasswordWrapper(),
  });
};

const submitFormHandler = (e: Event) => {
  e.preventDefault();
  console.log(GetFormData(e.target));
  accountForm.setProps({
    dataWrapper: new DataWrapper(true),
    actionsWrapper: new ActionsWrapper(
      switchDataHandler,
      switchPasswordHandler
    ),
    submitFormHandler: submitFormHandler,
  });
};

const accountForm = new AccountFrom({
  dataWrapper: new DataWrapper(true),
  actionsWrapper: new ActionsWrapper(switchDataHandler, switchPasswordHandler),
  submitFormHandler: submitFormHandler,
});

export default class Accounts extends Block {
  constructor() {
    super("div", {
      attributes: { class: "account-container" },
      backSidebar: new BackSidebar(),
      accountForm: accountForm,
    });
  }

  public render(): Node {
    return this.compile(accountsTemplate, this.props);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  render("main", new Accounts());
});
