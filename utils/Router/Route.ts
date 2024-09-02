import Block from "../Block/Block";
import { render } from "../renderDOM";

interface Properties {
  rootQuery: string;
  isPrivate: boolean;
  [key: string]: any;
}

export default class Route {
  public isPrivate: boolean;

  public pathname: string;
  private _blockClass: any;
  private _block: Block | null;
  private _props: Properties;
  private _root: Element | null;

  constructor(pathname: string, view: any, props: Properties) {
    this.pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._root = null;
    this.isPrivate = props.isPrivate;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._root && this._block) {
      this._root.removeChild(this._block.getContent());
    }
  }

  match(pathname: string) {
    return pathname == this.pathname;
  }

  render() {
    this._block = new this._blockClass();
    if (this._block != null) {
      this._root = render(this._props.rootQuery, this._block);
    }
  }
}
