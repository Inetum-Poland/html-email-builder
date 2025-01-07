import type { Editor } from "grapesjs";
import {
  Bold,
  Italic,
  Link,
  Text,
  Underline,
} from "lucide-static";
import { defaults } from "@defaults";

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

    rte.add("underline", {
      icon: Underline,
      attributes: { title: t("underline") },
      result: (rte) => rte.exec("underline"),
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
  });
};

export const TextBlock = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.Components.addType("textnode", {
    model: {
      defaults: {
        style: defaults.text,
        stylable: [
          "color",
          "font-family",
          "font-size",
          "padding",
        ],
      },
    },
  });

  editor.Components.addType("link", {
    model: {
      defaults: {
        toolbar: [],
        droppable: false,
        draggable: false,
        copyable: false,
        removable: false,
        highlightable: false,
        editable: true,
        style: defaults.link,
        stylable: [
          "color",
          "font-style",
          "font-weight",
          "text-decoration",
        ],
        traits: [
          "title",
          {
            label: t("link"),
            name: "href",
            placeholder: "eg. https://www.inetum.com/",
          },
        ],
      },
    },
  });

  editor.Components.addType("mj-text", {
    model: {
      defaults: {
        style: defaults.text,
        stylable: [
          "align",
          "color",
          "font-family",
          "font-size",
          "padding",
        ],
      },
    },
  });

  editor.Components.addType("table-text", {
    extend: "text",
    model: {
      defaults: {
        name: t("text"),
        tagName: "span",
        droppable: ["*"],
        draggable: ["td"],
        components: t("insertTextHere"),
        stylable: ["font-family", "font-size", "color"],
        style: {
          ...defaults.text,
          "padding-bottom": "0px",
          "padding-left": "0px",
          "padding-right": "0px",
          "padding-top": "0px",
        },
      },
    },
  });

  editor.Components.addType("text-generic", {
    model: {
      defaults: {
        draggable: ["[data-gjs-type=\"cell\"]", "[data-gjs-type=\"mj-column\"]"],
      },
    },
  });

  editor.on("component:mount", (component) => {
    if (component.attributes.type !== "text-generic") {
      return;
    }

    switch (component.parent().attributes.type) {
      case "mj-column": {
        const replaced = component.replaceWith(`<mj-text>${t("insertTextHere")}</mj-text>`);
        editor.trigger("change:canvas");
        editor.select(replaced);
        break;
      }
      case "cell": {
        const replaced = component.replaceWith({ type: "table-text" });
        editor.trigger("change:canvas");
        editor.select(replaced);
        break;
      }
      default: {
        component.remove();
        break;
      }
    }
  });

  editor.Blocks.add("text-generic", {
    label: t("text"),
    media: Text,
    content: { type: "text-generic" },
    activate: true,
    category: t("blocks"),
  });
};
