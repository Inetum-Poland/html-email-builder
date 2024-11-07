import type { PanelProperties } from "grapesjs";
import { Scan, FileCode2, Undo, Redo, FileJson2 } from "lucide-static";

export const Toolbar = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "toolbar",
    buttons: [
      {
        attributes: { title: t("toggleBorders") },
        command: "sw-visibility",
        id: "toggle-borders",
        label: Scan,
        tagName: "button",
      },
      {
        // todo: add HTML export
        attributes: { title: t("exportHTML") },
        // command: "export-template",
        id: "export-html",
        label: FileCode2,
        tagName: "button",
      },
      {
        // todo: add JSON export
        attributes: { title: t("exportJSON") },
        // command: (editor: Editor) => {
        //   editor.Modal.setTitle("Components JSON")
        //     .setContent(
        //       `<textarea style="width:100%; height: 250px;">
        //     ${JSON.stringify(editor.getComponents())}
        //   </textarea>`
        //     )
        //     .open();
        // },
        id: "export-json",
        label: FileJson2,
        tagName: "button",
      },
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
