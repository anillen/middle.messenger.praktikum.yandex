import { expect } from "chai";
import Router from "./Router";
import Block from "../Block/Block";

describe("Router", () => {
  class TestComponent {
    constructor() {}
  }

  const router = new Router("main");
  const testBlock = TestComponent as unknown as Block;

  it("Test state on go page", () => {
    expect(router).to.be.instanceOf(Router);
  });

  it("Test router use", () => {
    router.use("/test", testBlock);
    expect(router.routes).to.have.lengthOf(1);
  });

  it("Test router go and existing path", () => {
    router.use("/test", testBlock);
    router.go("/test");
    if (router.currentRoute != null) {
      router.currentRoute.render = () => {};
    }
    expect(router.currentRoute?.pathname).to.be.equals("/test");
  });
});
