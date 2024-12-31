import type { Editor } from "grapesjs";
import { SquarePlus } from "lucide-static";
import { defaults } from "@defaults";

export const ButtonBlock = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.Components.addType("mj-button", {
    model: {
      defaults: {
        style: defaults.button,
        stylable: [
          "align",
          "background-color",
          "border-radius",
          "color",
          "font-family",
          "font-size",
          "height",
          "padding",
          "width",
        ],
      },
    },
  });

  editor.Blocks.add("mj-button", {
    label: t("button"),
    activate: true,
    media: SquarePlus,
    content: `<mj-button>${t("button")}</mj-button>`,
    category: t("genericBlocks"),
  });
};
