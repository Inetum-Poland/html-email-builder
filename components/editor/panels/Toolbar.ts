import type { Editor, PanelProperties } from "grapesjs";
import { Scan, FileCode2, Undo, Redo, FileJson2 } from "lucide-static";
import { CodePreview, exportProject, Format } from "./components/CodePreview";

export const Toolbar = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "toolbar",
    buttons: [
      {
        attributes: { title: t("exportHTML"), class: "button-group-left" },
        command: (editor: Editor) => {
          const html = editor.Commands.run("mjml-code-to-html").html;
          const mjml = editor.Commands.run("mjml-code");

          const wrapper = document.createElement("div");
          wrapper.className = "code-preview";
          wrapper.append(CodePreview(editor, Format.MJML, mjml));
          wrapper.append(CodePreview(editor, Format.HTML, html));

          editor.Modal.setTitle(t("exportCode")).setContent(wrapper).open();
        },
        id: "export-html-modal",
        label: FileCode2,
        tagName: "button",
      },
      {
        attributes: {
          title: t("copyFormattedDocument"),
          id: "copy-document-button",
          class: "button-group-right",
        },
        command: async (editor: Editor) => {
          const button = document.querySelector("#copy-document-button");

          if (!button) {
            return;
          }

          const data = editor.Commands.run("mjml-code-to-html").html;
          const html = new Blob([data], { type: "text/html" });
          const content = new ClipboardItem({ "text/html": html });
          await navigator.clipboard.write([content]);
          button.innerHTML = t("copied");
          setTimeout(() => (button.innerHTML = t("copyDocument")), 3000);
        },
        id: "export-html",
        label: t("copyDocument"),
        tagName: "button",
      },
      {
        attributes: { title: t("exportJSON"), class: "button-group-left" },
        command: (editor: Editor) => {
          const json = JSON.stringify(editor.getProjectData(), null, 2);

          const wrapper = document.createElement("div");
          wrapper.className = "code-preview";
          wrapper.append(CodePreview(editor, Format.JSON, json));

          editor.Modal.setTitle(t("exportProjectState")).setContent(wrapper).open();
        },
        id: "export-json-modal",
        label: FileJson2,
        tagName: "button",
      },
      {
        attributes: {
          title: t("exportProjectState"),
          class: "button-group-right",
          id: "export-project-button",
        },
        command: (editor: Editor) => {
          const json = JSON.stringify(editor.getProjectData(), null, 2);
          exportProject(Format.JSON, json);
        },
        id: "export-json",
        label: t("saveProject"),
        tagName: "button",
      },
      {
        attributes: { title: t("toggleBorders") },
        command: "sw-visibility",
        id: "toggle-borders",
        label: Scan,
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
