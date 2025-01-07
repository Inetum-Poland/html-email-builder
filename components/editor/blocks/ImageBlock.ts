import type { Component, Editor } from "grapesjs";
import { Image } from "lucide-static";
import { defaults } from "@defaults";

export const ImageBlock = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  editor.Components.addType("mj-image", {
    model: {
      defaults: {
        style: defaults.image,
        stylable: ["width", "height", "padding", "align"],
        traits: [
          {
            label: t("altText"),
            name: "alt",
          },
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

  editor.Components.addType("image", {
    model: {
      defaults: {
        resizable: false,
        draggable: ["[data-gjs-type=\"cell\"]"],
        style: defaults.image,
        stylable: ["height", "width", "margin"],
        traits: [
          {
            label: t("altText"),
            name: "alt",
          },
          "title",
          {
            label: t("link"),
            name: "href",
            placeholder: "eg. https://www.inetum.com/",
            changeProp: true,
          },
        ],
      },
    },
  });

  editor.Components.addType("image-generic", {
    model: {
      defaults: {
        draggable: ["[data-gjs-type=\"cell\"]", "[data-gjs-type=\"mj-column\"]"],
      },
    },
  });

  editor.Blocks.add("image-generic", {
    label: t("image"),
    media: Image,
    attributes: { id: "image-block" },
    content: { type: "image-generic" },
    category: t("blocks"),
  });

  editor.on("component:mount", (component) => {
    if (component.attributes.type !== "image-generic") {
      return;
    }

    switch (component.parent().attributes.type) {
      case "mj-column": {
        const replaced = component.replaceWith(
          `<mj-image src="https://placehold.co/600x400?text=${t("image")}">`
        );
        editor.trigger("change:canvas");
        editor.select(replaced);
        break;
      }
      case "cell": {
        const replaced = component.replaceWith(
          `<img src="https://placehold.co/300x150?text=${t("image")}">`
        );
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

  editor.Components.addType("image-link", {
    isComponent: (element) =>
      element.nodeName === "A" && element.dataset.type === "image-link",
    model: {
      defaults: {
        draggable: ["[data-gjs-type=\"cell\"]"],
        droppable: ["[data-gjs-type=\"image\"]"],
        name: "link",
        tagName: "a",
        selectable: false,
        delegate: true,
      },
    },
  });

  editor.on("component:update:href", (element: Component) => {
    if (!element.is("image") || !element.collection) {
      return;
    }

    editor.UndoManager.stop();

    const child = element.view?.el.outerHTML;

    if (!child) {
      return;
    }

    const href = element.changed.href;
    const isLinked = element.parent()?.is("image-link");

    if (!href && element.parent()?.collection) {
      element.parent()?.replaceWith(child);
      return;
    }

    const link = isLinked
      ? element.parent()
      : element
        .replaceWith({
          type: "image-link",
          components: [element],
        })
        ?.at(0);

    if (!link) {
      return;
    }

    link.setAttributes({ href });
    editor.UndoManager.start();
  });
};
