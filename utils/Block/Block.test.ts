import { expect } from "chai";
import Block from "./Block";
import Handlebars from "handlebars";

describe("Block", () => {
  it("Create and init block", () => {
    const block = new Block("div");
    expect(block).to.be.instanceOf(Block);
  });

  it("Set props in block", () => {
    const block = new Block("div");
    block.setProps({ test: "test" });
    expect(block.props).to.have.property("test");
  });

  it("Set children in block", () => {
    const block = new Block("div");
    const children = new Block("div");
    block.setProps({ test: children });
    expect(block.children).to.have.property("test");
  });

  it("Set attribute in block", () => {
    const block = new Block("div");
    block.setProps({
      attributes: {
        class: "test",
      },
    });
    expect(block.attributes).to.have.property("class");
  });

  it("Get content from block not be null", () => {
    const block = new Block("div");
    expect(block.getContent()).not.be.null;
  });

  it("Testing compile block", () => {
    const template = () => {
      return Handlebars.compile("<div>{{test}}</div>");
    };
    const block = new Block("div");
    expect(block.compile(template, { test: "test" })).to.be.instanceOf(
      DocumentFragment
    );
  });
});
