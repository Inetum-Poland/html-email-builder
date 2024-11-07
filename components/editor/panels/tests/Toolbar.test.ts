import { expect, test } from "vitest";
import { Toolbar } from "../Toolbar";

test("renders the Toolbar panel", () => {
  expect(Toolbar()).toMatchSnapshot();
});
