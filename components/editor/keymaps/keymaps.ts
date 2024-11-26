import type { Editor } from "grapesjs";
import { getJSONProjectData, exportProject, getMjBody, selectChildren } from "@utils";
import { Format } from "@types";

export const saveProject = (editor: Editor) => {
  const json = getJSONProjectData(editor);
  exportProject(Format.JSON, json);
};

export const selectAll = (editor: Editor) => {
  const mjbody = getMjBody(editor);

  if (!mjbody) {
    return;
  }

  selectChildren(editor, mjbody);
};
