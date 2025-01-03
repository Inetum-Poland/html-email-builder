import type { Editor } from "grapesjs";
import beautify from "js-beautify";
import { Format } from "@types";

const fileFormatMap = new Map([
  [Format.HTML, "html"],
  [Format.JSON, "json"],
  [Format.MJML, "txt"],
]);

export const getHTML = (editor: Editor) => {
  const data = editor.Commands.run("mjml-code-to-html").html;
  return beautify.html(data);
};

export const getMJML = (editor: Editor) => {
  const data = editor.Commands.run("mjml-code");
  return beautify.html(data);
};

export const getJSONProjectData = (editor: Editor) => {
  return JSON.stringify(editor.getProjectData(), null, 2);
};

export const exportProject = (format: Format, data: string) => {
  const date = new Date().toISOString().slice(0, 10);
  const a = document.createElement("a");
  const file = new Blob([data], { type: "text/plain" });

  a.href = window.URL.createObjectURL(file);
  a.download = `${date}-${format}.${fileFormatMap.get(format)}`;
  a.click();

  window.URL.revokeObjectURL(a.href);
};

export const copyRichText = async (data: string) => {
  const html = new Blob([data], { type: "text/html" });
  const content = new ClipboardItem({ "text/html": html });
  await navigator.clipboard.write([content]);
};
