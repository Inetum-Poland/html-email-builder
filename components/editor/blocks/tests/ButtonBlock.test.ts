import { expect, test } from "vitest";
import { ButtonBlock } from "../ButtonBlock";

test("renders the Button block", () => {
  expect(ButtonBlock()).toMatchSnapshot();
});
