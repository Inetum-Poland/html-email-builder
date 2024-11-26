import type { Editor } from "grapesjs";
import { Clipboard, ClipboardCheck, FileDown, FileCheck } from "lucide-static";
import { exportProject } from "@utils";
import { Format } from "@types";

const modeMap = new Map([
  [Format.HTML, "htmlmixed"],
  [Format.JSON, "javascript"],
  [Format.MJML, "htmlmixed"],
]);

const CopyButton = (format: Format, data: string) => {
  const { $i18n: { t } } = useNuxtApp();

  const button = document.createElement("button");
  button.className = "button";

  const setCopy = () => button.innerHTML = `${Clipboard} ${t("copy")} ${format}`;
  const setCopied = () => button.innerHTML = `${ClipboardCheck} ${t("copied")} ${format}`;

  setCopy();

  button.onclick = () => {
    navigator.clipboard.writeText(data);
    setCopied();
    setTimeout(setCopy, 3000);
  };

  return button;
};

const DownloadButton = (format: Format, data: string) => {
  const { $i18n: { t } } = useNuxtApp();

  const button = document.createElement("button");
  button.className = "button";

  const setDownload = () => button.innerHTML = `${FileDown} ${t("download")} ${format}`;
  const setDownloaded = () => button.innerHTML = `${FileCheck} ${t("downloaded")} ${format}`;

  setDownload();

  button.onclick = () => {
    exportProject(format, data);
    setDownloaded();
    setTimeout(setDownload, 3000);
  };

  return button;
};

export const CodePreview = (
  editor: Editor,
  format: Format,
  data: string
) => {
  const options = {
    codeName: modeMap.get(format),
    theme: "vars",
    lineWrapping: false,
  };

  const content = editor.CodeManager.createViewer(options);
  content.setContent(data);

  const element = content.element;
  element.className = "code-block";

  const buttons = document.createElement("buttons");
  buttons.className = "buttons-wrapper";
  buttons.append(DownloadButton(format, data));
  buttons.append(CopyButton(format, data));

  element.prepend(buttons);

  return element;
};
