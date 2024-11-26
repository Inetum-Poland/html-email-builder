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

export const upload = (editor: Editor, wrapper: HTMLElement, callback: () => void) => {
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
      const data = JSON.parse(e.target?.result?.toString() || "{}");
      editor.loadProjectData(data);
      callback();
    };
  };

  wrapper.append(fileInput);
  const input = document.querySelector("#file-input") as HTMLInputElement;
  input.click();
};
