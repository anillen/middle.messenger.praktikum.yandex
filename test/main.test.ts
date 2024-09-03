import { expect } from "chai";
import { RunTest } from "./run-testing";

describe("Test system", () => {
  it("Test running", () => {
    expect(true);
  });

  it("Test imports", () => {
    expect(RunTest("accept"));
  });
});
