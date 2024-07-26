import EventBus from "./EventBus";
import { v4 as makeUUID } from "uuid";

class MetaInfo {
  tagName: string;
  props: object;
}

class Properties {
  [key: string]: any;
}

export default class Block {
  public static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public props: Properties;
  public eventBus: EventBus;
  public children: object;
  public attributes: object;

  private _element: HTMLElement;
  private _meta: MetaInfo;
  private _id: string;

  constructor(tagName: string = "div", propsAndChildren: object = {}) {
    const { children, props, attributes } = this._parseProps(propsAndChildren);

    this._meta = {
      tagName,
      props,
    };

    this._id = makeUUID();

    this.props = this.props?.settings.withInternalID
      ? this._makeProxyProps({ ...props, __id: this._id })
      : this._makeProxyProps(props);
    this.children = this._makeProxyProps(children);
    this.attributes = this._makeProxyProps(attributes);

    const eventBus = new EventBus();
    this.eventBus = eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  //#region  public functions
  public init(): void {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidMount(oldProps?: object): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  public componentDidUpdate(oldProps: object, newProps: object): boolean {
    return true;
  }

  public setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    const { children, props, attributes } = this._parseProps(nextProps);

    Object.assign(this.props, props);
    Object.assign(this.children, children);
    Object.assign(this.attributes, attributes);
  };

  public compile(template: Function, props: object): Node {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment: any = this._createDocumentElement("template");

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  public get element() {
    return this._element;
  }

  public render(): Node {
    return new Node();
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  public show(): void {
    this.getContent().style.display = "block";
  }

  public hide(): void {
    this.getContent().style.display = "none";
  }
  //#endregion

  //#region private functions
  private _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  private _render(): void {
    const block = this.render();

    this._removeEvents();
    this._element.innerHTML = "";

    this._element.appendChild(block);
    
    Object.keys(this.attributes).forEach((key) => {
      if (this.attributes[key]) {
        this._element.setAttribute(key, this.attributes[key]);
      }
    });

    this._addEvents();
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    if (this.props?.settings?.withInternalID) {
      element.setAttribute("data-id", this._id);
    }
    return element;
  }

  private _parseProps(propsAndChildren: object): any {
    const children: object = {};
    const props: object = {};
    let attributes: object = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (key == "attributes") attributes = value;

      if (value instanceof Block) {
        children[key] = value;
      }

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          children[`${key}${index}`] = item;
        });
      }

      props[key] = value;
    });
    return { children, props, attributes };
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _makeProxyProps(props: object): object {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _addEvents(): void {
    const events: object = this.props.events;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const events = this.props.events;
    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child: Block) => {
      child.dispatchComponentDidMount();
    });
  }
  //#endregion
}
