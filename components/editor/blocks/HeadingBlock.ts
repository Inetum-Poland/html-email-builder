import type { BlockProperties } from "grapesjs";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-static";

const icons = new Map([
  [1, Heading1],
  [2, Heading2],
  [3, Heading3],
  [4, Heading4],
  [5, Heading5],
  [6, Heading6],
]);

const sizes = new Map([
  [1, 2],
  [2, 1.5],
  [3, 1.17],
  [4, 1],
  [5, 0.83],
  [6, 0.67],
]);

export const HeadingBlock = (level: 1 | 2 | 3 | 4 | 5 | 6): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();
  const fontSize = sizes.get(level) || 1;
  const lineHeight = 1.15;

  return {
    label: `H${level}`,
    media: icons.get(level),
    content: `
    <mj-text font-size="${fontSize}rem" line-height="${lineHeight}">
      ${t("heading")}
    </mj-text>`,
    activate: true,
    attributes: { title: `${t("heading")} ${level}` },
    category: t("genericBlocks"),
  };
};
