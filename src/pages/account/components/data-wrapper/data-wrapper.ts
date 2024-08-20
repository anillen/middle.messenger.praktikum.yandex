import AuthService from "../../../../../services/AuthService/AuthService";
import Block from "../../../../../utils/Block";
import "./data-wrapper.scss";
import dataWrapperTemplate from "./data-wrapper.hbs";
import Image from "../../../../components/image/image";
import DefaultWrapper from "./components/default-wrapper/default-wrapper";
import SwitchDataWrapper from "./components/switch-data-wrapper/switch-data-wrapper";
import GetFormData from "../../../../../utils/GetFormData";
import AccountService from "../../../../../services/AccountService/AccountService";
import SwitchDataModel from "../../../../../services/AccountService/models/SwitchDataModel";
import UserInfo from "../../../../../services/AuthService/models/UserInfo";
import SwitchPasswordWrapper from "./components/switch-password-wrapper/switch-password-wrapper";

export default class DataWrapper extends Block {
  switchDataformSubmitHandler(e: Event) {
    e.preventDefault();
    const formObject = GetFormData<SwitchDataModel>(e.target);
    AccountService.changeUserProfile(formObject).then(() => {
      this.setProps({
        ...this.props,
        dataContainer: new DefaultWrapper(
          formObject as UserInfo,
          this.switchDataHandler.bind(this),
          this.switchPasswordHandler.bind(this)
        ),
      });
    });
  }

  switchDataHandler() {
    this.setProps({
      ...this.props,
      dataContainer: new SwitchDataWrapper(
        this.props.userInfo,
        this.switchDataformSubmitHandler.bind(this)
      ),
    });
  }

  switchPasswordFormOnSubmit() {
    this.setProps({
      ...this.props,
      dataContainer: new DefaultWrapper(
        this.props.userInfo,
        this.switchDataHandler.bind(this),
        this.switchPasswordHandler.bind(this)
      ),
    });
  }

  switchPasswordHandler() {
    this.setProps({
      ...this.props,
      dataContainer: new SwitchPasswordWrapper(
        this.switchPasswordFormOnSubmit.bind(this)
      ),
    });
  }

  refresh() {
    AuthService.GetUserInfo().then(result => {
      this.setProps({
        ...this.props,
        firstName: result.first_name,
        userInfo: result,
        dataContainer: new DefaultWrapper(
          result,
          this.switchDataHandler.bind(this),
          this.switchPasswordHandler.bind(this)
        ),
      });

      if (result.avatar) {
        this.setProps({
          ...this.props,
          avatarImage: new Image({
            alt: "Аватар",
            source: `https://ya-praktikum.tech/api/v2/resources/${result.avatar}`,
          }),
        });
      }
    });
  }

  constructor(showAvatarChangeModal: Function) {
    AuthService.GetUserInfo().then(result => {
      this.setProps({
        ...this.props,
        firstName: result.first_name,
        userInfo: result,
        dataContainer: new DefaultWrapper(
          result,
          this.switchDataHandler.bind(this),
          this.switchPasswordHandler.bind(this)
        ),
      });

      if (result.avatar) {
        this.setProps({
          ...this.props,
          avatarImage: new Image({
            alt: "Аватар",
            source: `https://ya-praktikum.tech/api/v2/resources/${result.avatar}`,
          }),
        });
      }
    });

    super("div", {
      attributes: {
        class: "account-container",
      },
      userInfo: null,
      avatarImage: new Image({
        alt: "Аватар",
        source: "/static/image-icon.svg",
      }),
      eventSelector: ".avatar-image",
      events: {
        click: showAvatarChangeModal,
      },
      firstName: "",
    });
  }

  public render(): Node {
    return this.compile(dataWrapperTemplate, this.props);
  }
}
