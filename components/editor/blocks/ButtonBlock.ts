import { useI18n } from "vue-i18n";
import type { BlockProperties } from "grapesjs";
import { SquarePlus } from "lucide-static";

export const ButtonBlock = (): BlockProperties => {
  const { t } = useI18n();

  return {
    label: t("button"),
    media: SquarePlus,
    content: `<mj-button>${t("button")}</mj-button>`,
  };
};
