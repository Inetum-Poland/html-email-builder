import type { Component, Editor } from "grapesjs";

export const getBody = (editor: Editor) => {
  const body = editor.DomComponents.getComponent();
  return body;
};

export const getMjBody = (editor: Editor) => {
  const body = getBody(editor);
  const mjml = body?.getChildAt(0);
  const mjbody = mjml?.getChildAt(0);
  return mjbody;
};

export const selectChildren = (editor: Editor, component: Component) => {
  component?.get("components")?.each((child: Component) => editor.selectAdd(child));
};
