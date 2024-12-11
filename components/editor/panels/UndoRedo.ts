import type { PanelProperties } from "grapesjs";
import { Undo, Redo } from "lucide-static";

export const UndoRedo = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    appendTo: "#top-bar",
    id: "undo-redo-panel",
    buttons: [
      {
        attributes: { title: t("undo") },
        command: "core:undo",
        id: "undo",
        label: Undo,
        tagName: "button",
      },
      {
        attributes: { title: t("redo") },
        command: "core:redo",
        id: "redo",
        label: Redo,
        tagName: "button",
      },
    ],
  };
};
