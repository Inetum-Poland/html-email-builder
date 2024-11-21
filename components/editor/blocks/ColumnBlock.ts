import type { BlockProperties } from "grapesjs";
import { Square, Columns2, Columns3 } from "lucide-static";

const createContent = (count: number) => {
  const { $i18n: { t } } = useNuxtApp();

  return `
  <mj-section>
    ${`<mj-column><mj-text>${t("insertTextHere")}</mj-text></mj-column>`.repeat(count)}
  </mj-section>
  `;
};

const icons = new Map([
  [1, Square],
  [2, Columns2],
  [3, Columns3],
]);

export const ColumnBlock = (count: 1 | 2 | 3): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    select: true,
    label: t("column", count),
    media: icons.get(count),
    content: createContent(count),
    category: t("genericBlocks"),
  };
};
