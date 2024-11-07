import { expect, test } from "vitest";
import { ColumnBlock } from "../ColumnBlock";

test.each([1, 2, 3, 4] as const)(
  "renders the Column block with %i column(s)",
  (count) => expect(ColumnBlock(count)).toMatchSnapshot()
);
