import type { Editor } from "grapesjs";
import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-static";
import { defaults } from "@defaults";

export const TablePlugin = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.Components.addType("table", {
    model: {
      defaults: {
        copyable: false,
        draggable: false,
        droppable: false,
        style: defaults.table,
        stylable: ["background-color"],
      },
    },
  });

  editor.Components.addType("tbody", {
    model: {
      defaults: {
        copyable: false,
        draggable: false,
        stylable: false,
        traits: [],
        selectable: false,
      },
    },
  });

  editor.Components.addType("row", {
    model: {
      defaults: {
        components: { type: "cell" },
        stylable: false,
        traits: [],
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
        components: { type: "table-text" },
        traits: ["id", "title", "colspan"],
        style: defaults.cell,
        stylable: [
          "background-color",
          "border",
          "padding",
          "text-align",
          "vertical-align",
        ],
      },
    },
  });

  editor.Components.addType("mj-raw", {
    model: {
      activate: true,
      defaults: {
        name: t("tableWrapper"),
        draggable: false,
        droppable: false,
      },
    },
  });

  editor.Blocks.add("mj-table", {
    category: t("tableLayout"),
    label: t("table"),
    media: LayoutGrid,
    content: `
      <mj-section>
        <mj-raw>
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
        </mj-raw>
      </mj-section>
    `,
    activate: true,
    attributes: { id: "table-block" },
  });

  editor.Blocks.add("mj-table-row", {
    category: t("tableLayout"),
    label: t("row"),
    media: BetweenHorizonalEnd,
    content: { type: "row" },
    activate: true,
  });

  editor.Blocks.add("mj-table-cell", {
    category: t("tableLayout"),
    label: t("cell"),
    media: BetweenVerticalEnd,
    content: { type: "cell" },
    activate: true,
  });
};
