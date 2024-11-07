import { expect, test } from "vitest";
import { TabSwitcher } from "../TabSwitcher";

test("renders the Tab Switcher panel", () => {
  expect(TabSwitcher()).toMatchSnapshot();
});
