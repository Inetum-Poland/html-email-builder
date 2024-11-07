import { expect, test } from "vitest";
import { DeviceManager } from "../DeviceManager";

test("renders the Device Manager panel", () => {
  expect(DeviceManager()).toMatchSnapshot();
});
