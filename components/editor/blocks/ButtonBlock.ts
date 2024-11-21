import type { BlockProperties } from "grapesjs";
import { SquarePlus } from "lucide-static";

export const ButtonBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    label: t("button"),
    media: SquarePlus,
    content: `<mj-button>${t("button")}</mj-button>`,
    category: t("genericBlocks"),
  };
};
