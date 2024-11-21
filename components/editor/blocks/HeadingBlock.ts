import type { BlockProperties } from "grapesjs";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-static";
import { defaults } from "./defaults";

const icons = new Map([
  [1, Heading1],
  [2, Heading2],
  [3, Heading3],
  [4, Heading4],
  [5, Heading5],
  [6, Heading6],
]);

export const HeadingBlock = (level: 1 | 2 | 3 | 4 | 5 | 6): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();
  const fontSize = defaults.headers[level];

  return {
    label: `H${level}`,
    media: icons.get(level),
    content: `
    <mj-text font-size="${fontSize}" font-weight="700">
      ${t("heading")}
    </mj-text>`,
    activate: true,
    attributes: { title: `${t("heading")} ${level}` },
    category: t("genericBlocks"),
  };
};
