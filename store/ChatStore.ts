import Block from "../utils/Block";

class ChatStore {
  public currentChatId: number;
  private _blocks: Array<Block>;

  constructor() {
    this._blocks = new Array<Block>();

    this.currentChatId = -1;

    Object.defineProperty(this, "currentChatId", {
      set(value: number) {
        this._blocks.forEach((block: Block) => {
          block.setProps({
            ...block.props,
            currentChatId: value,
          });
        });
      },
    });
  }

  public getCurrentChatId(): number {
    return this.currentChatId;
  }

  public subscribe(block: Block) {
    this._blocks.push(block);
  }

  public setCurrentChatId(id: number) {
    this.currentChatId = id;
  }
}

export default new ChatStore();
