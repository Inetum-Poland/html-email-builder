import type { BlockProperties, Editor } from "grapesjs";
import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  Image,
  LayoutGrid,
  Text,
} from "lucide-static";
import { defaults } from "./defaults";

const textAttributes = [
  "color",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "letter-spacing",
  "line-height",
  "text-decoration",
];

export const TablePlugin = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.Components.addType("table", {
    model: {
      defaults: {
        copyable: false,
        draggable: false,
        droppable: false,
        style: defaults.table,
        stylable: ["margin", "max-width"],
      },
    },
  });

  editor.Components.addType("tbody", {
    model: {
      defaults: {
        copyable: false,
        draggable: false,
        stylable: ["background-color", "text-align", ...textAttributes],
      },
    },
  });

  editor.Components.addType("row", {
    model: {
      defaults: {
        components: { type: "cell" },
        stylable: ["background-color", "text-align", ...textAttributes],
      },
    },
  });

  editor.Components.addType("cell", {
    isComponent(el) {
      if (!["TD", "TH"].includes(el.tagName)) {
        return false;
      }

      return ![...el.childNodes].every(
        ({ nodeType, nodeName }) =>
          nodeType === Node.TEXT_NODE || nodeName === "BR"
      );
    },
    model: {
      defaults: {
        components: { type: "text" },
        traits: ["id", "title", "colspan"],
        style: defaults.cell,
        stylable: [
          "background-color",
          "border",
          "height",
          "max-width",
          "padding",
          "width",
          "text-align",
          ...textAttributes,
        ],
      },
    },
  });

  editor.Components.addType("text", {
    model: {
      defaults: {
        tagName: "span",
        droppable: ["*"],
        draggable: ["td"],
        components: t("insertTextHere"),
        stylable: [...textAttributes],
        style: defaults.text,
      },
    },
  });

  editor.Components.addType("image", {
    model: {
      defaults: {
        draggable: ["td"],
        style: defaults.image,
        stylable: [
          "border-radius",
          "border",
          "height",
          "margin",
          "max-width",
          "width",
        ],
      },
    },
  });

  editor.Components.addType("mj-raw", {
    model: {
      activate: true,
      defaults: {
        name: t("tableWrapper"),
        droppable: false,
        tagName: "mj-raw",
        components: `
          <table>
            <tr>
              <td>
                <img src="https://placehold.co/300x150?text=1"/>
              </td>
              <td>
                <img src="https://placehold.co/300x150?text=2"/>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://placehold.co/300x150?text=3"/>
              </td>
              <td>
                <img src="https://placehold.co/300x150?text=4"/>
              </td>
            </tr>
          </table>
        `,
      },
    },
  });
};

export const TableBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    category: t("tableBlocks"),
    label: t("table"),
    media: LayoutGrid,
    content: { type: "mj-raw" },
    activate: true,
    attributes: { id: "table-block" },
  };
};

export const RowBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    category: t("tableBlocks"),
    label: t("row"),
    media: BetweenHorizonalEnd,
    content: { type: "row" },
    activate: true,
  };
};

export const CellBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    category: t("tableBlocks"),
    label: t("cell"),
    media: BetweenVerticalEnd,
    content: { type: "cell" },
    activate: true,
  };
};

export const CellTextBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    category: t("tableBlocks"),
    label: t("cellText"),
    media: Text,
    content: { type: "text" },
    activate: true,
  };
};

export const CellImageBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    category: t("tableBlocks"),
    label: t("cellImage"),
    media: Image,
    content: `<img src="https://placehold.co/300x150?text=${t("image")}">`,
    activate: true,
  };
};
