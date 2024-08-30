import Block from "./Block/Block";

export function render(query: string, block: Block): Element | null {
  const root = document.querySelector(query);
  if (!root) {
    return null;
  }
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
