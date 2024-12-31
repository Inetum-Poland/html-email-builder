import type { Editor } from "grapesjs";
import { SquareSplitVertical } from "lucide-static";
import { defaults } from "@defaults";

export const DividerBlock = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.Components.addType("mj-divider", {
    model: {
      defaults: {
        style: defaults.divider,
        stylable: [
          "align",
          "border-detached",
          "padding",
          "width",
        ],
      },
    },
  });

  editor.Blocks.add("mj-divider", {
    label: t("separator"),
    activate: true,
    media: SquareSplitVertical,
    category: t("blocks"),
    content: "<mj-divider/>"
  });
};
