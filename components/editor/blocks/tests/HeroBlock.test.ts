import { expect, test } from "vitest";
import { HeroBlock } from "../HeroBlock";

test("renders the Hero block", () => {
  expect(HeroBlock()).toMatchSnapshot();
});
