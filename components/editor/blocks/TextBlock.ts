import type { BlockProperties } from "grapesjs";
import { Text } from "lucide-static";

export const TextBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();
  const lineHeight = 1.5;

  return {
    label: t("text"),
    media: Text,
    content: `<mj-text line-height="${lineHeight}">${t("insertTextHere")}</mj-text>`,
    activate: true,
  };
};
