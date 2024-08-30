import Block from "../../../utils/Block/Block";
import "./account.scss";
import accountsTemplate from "./account.hbs";
import BackSidebar from "../../components/back-sidebar/back-sidebar";
import DataWrapper from "./components/data-wrapper/data-wrapper";
import ChangeAvatarModal from "./components/data-wrapper/components/change-avatar-modal/change-avatar-modal";

const showAvatarModal = () => {
  avatarModal.showModal();
};
const onUpdateAvatar = () => {
  accountWrapper.refresh();
};

let avatarModal: ChangeAvatarModal;
let accountWrapper: DataWrapper;

export default class Accounts extends Block {
  constructor() {
    avatarModal = new ChangeAvatarModal(onUpdateAvatar);
    accountWrapper = new DataWrapper(showAvatarModal);

    super("div", {
      attributes: { class: "account-container" },
      backSidebar: new BackSidebar(),
      accountWrapper: accountWrapper,
      changeAvatarModal: avatarModal,
    });
  }

  public render(): Node {
    return this.compile(accountsTemplate, this.props);
  }
}
