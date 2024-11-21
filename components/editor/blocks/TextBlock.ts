import type { BlockProperties } from "grapesjs";
import { Text } from "lucide-static";

export const TextBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    label: t("text"),
    media: Text,
    content: `<mj-text>${t("insertTextHere")}</mj-text>`,
    activate: true,
    category: t("genericBlocks"),
  };
};
