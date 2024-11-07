import { expect, test } from "vitest";
import { HeadingBlock } from "../HeadingBlock";

test.each([1, 2, 3, 4, 5, 6] as const)("renders the H%i heading", (level) =>
  expect(HeadingBlock(level)).toMatchSnapshot()
);
