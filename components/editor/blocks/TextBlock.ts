import { useI18n } from "vue-i18n";
import type { BlockProperties } from "grapesjs";
import { Text } from "lucide-static";

export const TextBlock = (): BlockProperties => {
  const { t } = useI18n();
  const lineHeight = 1.5;

  return {
    label: t("text"),
    media: Text,
    content: `<mj-text line-height="${lineHeight}">${t("insertTextHere")}</mj-text>`,
    activate: true,
  };
};
