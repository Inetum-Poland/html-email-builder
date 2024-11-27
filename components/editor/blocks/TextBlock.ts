import type { BlockProperties, Editor } from "grapesjs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Italic,
  Link,
  Text,
} from "lucide-static";

enum ButtonState {
  ACTIVE = 1,
  INACTIVE = 0,
  DISABLED = -1,
}

const isValidTag = (rte: any, tagName: string) => {
  const { anchorNode, focusNode } = rte.selection() || {};
  const parentAnchor = anchorNode?.parentNode;
  const parentFocus = focusNode?.parentNode;
  return parentAnchor?.nodeName == tagName || parentFocus?.nodeName == tagName;
};

export const TextToolbar = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  const rte = editor.RichTextEditor;

  editor.onReady(() => {
    rte.remove("wrap");
    rte.remove("bold");
    rte.remove("italic");
    rte.remove("underline");
    rte.remove("strikethrough");
    rte.remove("link");

    rte.add("bold", {
      icon: Bold,
      attributes: { title: t("bold") },
      result: (rte) => rte.exec("bold"),
    });

    rte.add("italic", {
      icon: Italic,
      attributes: { title: t("italic") },
      result: (rte) => rte.exec("italic"),
    });

    rte.add("link", {
      icon: Link,
      attributes: { title: t("link") },
      state: (rte) =>
        rte && rte.selection() && isValidTag(rte, "A")
          ? ButtonState.ACTIVE
          : ButtonState.INACTIVE,
      result: (rte) =>
        isValidTag(rte, "A")
          ? rte.exec("unlink")
          : rte.insertHTML(`<a href="">${rte.selection()}</a>`, { select: true }),
    });

    rte.add("clearFormatting", {
      icon: Eraser,
      attributes: { title: t("clearFormatting") },
      result: (rte) => rte.exec("removeFormat"),
    });

    rte.add("justifyLeft", {
      icon: AlignLeft,
      attributes: { title: t("alignLeft") },
      result: (rte) => rte.exec("justifyLeft"),
    });

    rte.add("justifyCenter", {
      icon: AlignCenter,
      attributes: { title: t("alignCenter") },
      result: (rte) => rte.exec("justifyCenter"),
    });

    rte.add("justifyRight", {
      icon: AlignRight,
      attributes: { title: t("alignRight") },
      result: (rte) => rte.exec("justifyRight"),
    });

    rte.add("justifyFull", {
      icon: AlignJustify,
      attributes: { title: t("alignJustify") },
      result: (rte) => rte.exec("justifyFull"),
    });
  });
};

export const TextBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    label: t("text"),
    media: Text,
    content: `<mj-text>${t("insertTextHere")}</mj-text>`,
    activate: true,
    category: t("genericBlocks"),
  };
};
