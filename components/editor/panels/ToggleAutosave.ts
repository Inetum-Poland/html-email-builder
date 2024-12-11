import type { Editor, PanelProperties } from "grapesjs";
import { FileCheck2, FileX2 } from "lucide-static";

export const ToggleAutosavePanel = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    appendTo: "#bottom-bar",
    id: "toggle-autosave-panel",
    buttons: [
      {
        active: true,
        attributes: {
          id: "toggle-autosave",
          title: t("toggleAutosave"),
          class: "inline no-shadow",
        },
        command: "toggle-autosave",
        id: "toggle-autosave",
        tagName: "button",
      },
    ],
  };
};

export const handleAutosave = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.on("command:run:toggle-autosave", () => {
    editor.Panels.getButton("toggle-autosave-panel", "toggle-autosave")?.set({
      label: `${FileCheck2} ${t("changesSaved")}`,
    });
  });

  editor.on("command:stop:toggle-autosave", () => {
    editor.Panels.getButton("toggle-autosave-panel", "toggle-autosave")?.set({
      label: `${FileX2} ${t("notSavingChanges")}`,
    });
  });
};
