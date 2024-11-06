import { useI18n } from "vue-i18n";
import type { BlockProperties } from "grapesjs";
import { Square, Columns2, Columns3, Columns4 } from "lucide-static";

const createContent = (count: number) => {
  const { t } = useI18n();

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
  [4, Columns4],
]);

export const ColumnBlock = (count: 1 | 2 | 3 | 4): BlockProperties => {
  const { t } = useI18n();

  return {
    select: true,
    label: t("column", count),
    media: icons.get(count),
    content: createContent(count),
  };
};
