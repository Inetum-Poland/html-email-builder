import type { Editor, PanelProperties } from "grapesjs";
import { ArrowUpFromLine } from "lucide-static";
import { Format } from "@types";
import { exportProject, getHTML, getJSONProjectData } from "@utils";
import { DownloadButton } from "./components/DownloadButton";
import { CopyButton } from "./components/CopyButton";

export const handleExport = (editor: Editor) => {
  const menu = document.querySelector("#export-menu") as HTMLElement;

  menu.append(DownloadButton("exportHtmlDocument", () => {
    const data = getHTML(editor);
    exportProject(Format.HTML, data);
    menu.hidePopover();
  }));

  menu.append(CopyButton("copyHtmlCode", () => {
    const data = getHTML(editor);
    navigator.clipboard.writeText(data);
    menu.hidePopover();
  }));

  menu.append(DownloadButton("exportJsonProjectFile", () => {
    const data = getJSONProjectData(editor);
    exportProject(Format.JSON, data);
    menu.hidePopover();
  }));

  menu.append(CopyButton("copyJsonCode", () => {
    const data = getJSONProjectData(editor);
    navigator.clipboard.writeText(data);
    menu.hidePopover();
  }));
};

export const ExportProject = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    appendTo: "#bottom-bar",
    id: "state-panel",
    buttons: [
      {
        attributes: {
          id: "export-button",
          title: t("export"),
          class: "call-to-action inline",
          popovertarget: "export-menu",
        },
        id: "export-html-modal",
        label: `${ArrowUpFromLine} ${t("export")}`,
        tagName: "button",
      },
    ],
  };
};
