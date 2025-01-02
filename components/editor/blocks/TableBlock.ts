import type { Editor } from "grapesjs";
import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  Image,
  LayoutGrid,
  Text,
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

  editor.Components.addType("image", {
    model: {
      defaults: {
        resizable: false,
        draggable: ["td"],
        style: defaults.image,
        stylable: ["height", "width", "margin"],
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
    category: t("tableBlocks"),
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
    category: t("tableBlocks"),
    label: t("row"),
    media: BetweenHorizonalEnd,
    content: { type: "row" },
    activate: true,
  });

  editor.Blocks.add("mj-table-cell", {
    category: t("tableBlocks"),
    label: t("cell"),
    media: BetweenVerticalEnd,
    content: { type: "cell" },
    activate: true,
  });

  editor.Blocks.add("mj-table-cell-text", {
    category: t("tableBlocks"),
    label: t("cellText"),
    media: Text,
    content: { type: "table-text" },
    activate: true,
  });

  editor.Blocks.add("mj-table-cell-image", {
    category: t("tableBlocks"),
    label: t("cellImage"),
    media: Image,
    content: `<img src="https://placehold.co/300x150?text=${t("image")}">`,
    activate: true,
  });

  editor.Components.addType("image-link", {
    isComponent: (element) =>
      element.nodeName === "A" && element.dataset.type === "image-link",
    model: {
      defaults: {
        name: "Link",
        tagName: "a",
        traits: ["title", "href", "target"],
        stylable: false,
      },
    },
  });

  editor.Commands.add("image-link", {
    run(editor) {
      const selected = editor.getSelected();

      if (!selected) {
        return;
      }

      const isLinked = selected.parent()?.attributes.tagName === "a";

      if (isLinked) {
        return;
      }

      const child = selected.view?.el.outerHTML;

      const linked = selected.replaceWith({
        tagName: "a",
        type: "image-link",
        attributes: {
          "data-type": "image-link",
          "href": "",
        },
        components: [child],
      });

      editor.trigger("change:canvas");
      editor.select(linked);
    },
  });

  editor.Commands.add("image-unlink", {
    run(editor) {
      const selected = editor.getSelected();

      if (!selected) {
        return;
      }

      const isLinked = selected.parent()?.attributes.tagName === "a";

      if (!isLinked) {
        return;
      }

      const child = selected.view?.el.outerHTML;

      if (!child) {
        return;
      }

      const unlinked = selected.parent()?.replaceWith(child)?.at(0);
      editor.trigger("change:canvas");
      editor.select(unlinked);
      return;
    },
  });

  editor.on("component:selected", (element) => {
    if (element.attributes?.type !== "image") {
      return;
    }

    const isLinked = element?.parent()?.attributes.tagName === "a";

    const action = isLinked
      ? {
          attributes: { class: "fa fa-chain-broken" },
          command: "image-unlink",
        }
      : {
          attributes: { class: "fa fa-link" },
          command: "image-link",
        };

    const toolbar = element.get("toolbar");
    const index = toolbar.findIndex(
      ({ command }: { command: string }) => command === action.command
    );

    if (index !== -1) {
      toolbar.splice(index, 1);
    }

    toolbar.push(action);
    element.set("toolbar", toolbar);
  });
};
