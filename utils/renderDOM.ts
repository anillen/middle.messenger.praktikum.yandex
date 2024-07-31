import Block from "./Block";

export function render(query: string, block: Block): Element | null {
  const root = document.querySelector(query);

  root!.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
