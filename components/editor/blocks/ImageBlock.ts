import type { BlockProperties } from "grapesjs";
import { Image } from "lucide-static";

export const ImageBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    label: t("image"),
    media: Image,
    attributes: { id: "image-block" },
    content: `<mj-image src="https://placehold.co/600x400?text=${t("image")}">`,
    activate: true,
    category: t("genericBlocks"),
  };
};
