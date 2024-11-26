import type { Editor, PanelProperties } from "grapesjs";
import {
  Scan,
  FileCode2,
  Undo,
  Redo,
  FileJson2,
  FileCheck2,
} from "lucide-static";
import { getJSONProjectData, exportProject, copyRichText, getHTML, getMJML } from "@utils";
import { Format } from "@types";
import { CodePreview } from "./components/CodePreview";

const onHTMLPreview = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  const html = getHTML(editor);
  const mjml = getMJML(editor);

  const wrapper = document.createElement("div");
  wrapper.className = "code-preview";
  wrapper.append(CodePreview(editor, Format.MJML, mjml));
  wrapper.append(CodePreview(editor, Format.HTML, html));

  editor.Modal.setTitle(t("exportCode")).setContent(wrapper).open();
};

const onCopyDocument = async (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  const button = document.querySelector("#copy-document-button");

  if (!button) {
    return;
  }

  const data = getHTML(editor);
  await copyRichText(data);
  button.innerHTML = t("copied");
  setTimeout(() => (button.innerHTML = t("copyDocument")), 3000);
};

const onJSONPreview = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  const json = getJSONProjectData(editor);

  const wrapper = document.createElement("div");
  wrapper.className = "code-preview";
  wrapper.append(CodePreview(editor, Format.JSON, json));

  editor.Modal.setTitle(t("exportProjectState")).setContent(wrapper).open();
};

const onSaveJSON = (editor: Editor) => {
  const json = getJSONProjectData(editor);
  exportProject(Format.JSON, json);
};

export const StatePanel = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "state-panel",
    buttons: [
      {
        attributes: { title: t("exportHTML"), class: "button-group-left" },
        command: onHTMLPreview,
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
        command: onCopyDocument,
        id: "export-html",
        label: t("copyDocument"),
        tagName: "button",
      },
      {
        attributes: { title: t("exportJSON"), class: "button-group-left" },
        command: onJSONPreview,
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
        command: onSaveJSON,
        id: "export-json",
        label: t("saveProject"),
        tagName: "button",
      },
    ],
  };
};

export const UndoRedoPanel = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
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

export const ToggleAutosavePanel = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "toggle-autosave-panel",
    buttons: [
      {
        active: true,
        attributes: { title: t("toggleAutosave") },
        command: "toggle-autosave",
        id: "toggle-autosave",
        label: FileCheck2,
        tagName: "button",
      },
    ],
  };
};

export const ToggleBordersPanel = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "toggle-borders-panel",
    buttons: [
      {
        attributes: { title: t("toggleBorders") },
        command: "sw-visibility",
        id: "toggle-borders",
        label: Scan,
        tagName: "button",
      },
    ],
  };
};
