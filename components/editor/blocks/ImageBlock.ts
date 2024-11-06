import { useI18n } from "vue-i18n";
import type { BlockProperties } from "grapesjs";
import { Image } from "lucide-static";

export const ImageBlock = (): BlockProperties => {
  const { t } = useI18n();

  return {
    label: t("image"),
    media: Image,
    content: `<mj-image src="https://placehold.co/600x400?text=${t("image")}"/>`,
    activate: true,
  };
};
