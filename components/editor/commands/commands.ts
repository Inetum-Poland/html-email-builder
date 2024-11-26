import type { Editor } from "grapesjs";

export const toggleAutosave = {
  run(editor: Editor) {
    editor.StorageManager.setAutosave(true);
  },
  stop(editor: Editor) {
    editor.StorageManager.setAutosave(false);
  },
};
