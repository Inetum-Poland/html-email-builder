import type { Editor, PanelProperties } from "grapesjs";
import { Scan, FileCode2, Undo, Redo, FileJson2 } from "lucide-static";
import { CodePreview, Format } from "./components/CodePreview";

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
        attributes: { title: t("exportHTML") },
        command: (editor: Editor) => {
          const html = editor.Commands.run("mjml-code-to-html").html;
          const mjml = editor.Commands.run("mjml-code");

          const wrapper = document.createElement("div");
          wrapper.className = "code-preview";
          wrapper.append(CodePreview(editor, Format.MJML, mjml));
          wrapper.append(CodePreview(editor, Format.HTML, html));

          editor.Modal.setTitle(t("exportCode")).setContent(wrapper).open();
        },
        id: "export-html",
        label: FileCode2,
        tagName: "button",
      },
      {
        attributes: { title: t("exportJSON") },
        command: (editor: Editor) => {
          const json = JSON.stringify(editor.getProjectData(), null, 2);

          const wrapper = document.createElement("div");
          wrapper.className = "code-preview";
          wrapper.append(CodePreview(editor, Format.JSON, json));

          editor.Modal.setTitle(t("exportProjectState")).setContent(wrapper).open();
        },
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
