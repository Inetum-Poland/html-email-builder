import { expect, test } from "vitest";
import { ImageBlock } from "../ImageBlock";

test("renders the Hero block", () => {
  expect(ImageBlock()).toMatchSnapshot();
});
