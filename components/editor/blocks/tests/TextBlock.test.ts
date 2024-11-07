import { expect, test } from "vitest";
import { TextBlock } from "../TextBlock";

test("renders the Text block", () => {
  expect(TextBlock()).toMatchSnapshot();
});
