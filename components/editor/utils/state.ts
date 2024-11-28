import type { Editor } from "grapesjs";
import { getMjBody } from "./editor";

export const restore = async (editor: Editor) => {
  const data = await editor.StorageManager.load();
  editor.loadProjectData(data);
};

export const clear = (editor: Editor) => {
  const mjbody = getMjBody(editor);
  mjbody?.empty();
};

export const upload = (wrapper: HTMLElement, callback: (data?: string) => void) => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.className = "file-input";
  fileInput.accept = ".json, .txt";
  fileInput.id = "file-input";
  fileInput.style.display = "none";

  fileInput.onchange = (event: any) => {
    if (!event.target.files?.[0]) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(event.target.files?.[0]);
    reader.onload = (e) => {
      const data = e.target?.result?.toString();
      callback(data);
      input.remove();
    };
  };

  wrapper.append(fileInput);
  const input = document.querySelector("#file-input") as HTMLInputElement;
  input.click();
};

export const isValidProjectFile = (data: JSON | object) => {
  const required = ["assets", "styles", "pages", "symbols", "dataSources"];
  const present = Object.keys(data);
  return typeof data === "object" && required.every((key) => present.includes(key));
};
