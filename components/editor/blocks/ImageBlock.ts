import type { Editor } from "grapesjs";
import { Image } from "lucide-static";
import { defaults } from "@defaults";

export const ImageBlock = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.Components.addType("mj-image", {
    model: {
      defaults: {
        style: defaults.image,
        stylable: ["width", "height", "padding", "align"]
      },
    },
  });

  editor.Blocks.add("mj-image", {
    label: t("image"),
    media: Image,
    attributes: { id: "image-block" },
    content: `<mj-image src="https://placehold.co/600x400?text=${t("image")}">`,
    activate: true,
    category: t("genericBlocks"),
  });
};
