import type { Editor, PanelProperties, Sector } from "grapesjs";
import { Paintbrush, Settings, Layers, Blocks } from "lucide-static";

export const ComponentTabs = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "component-tabs",
    buttons: [
      {
        id: "style-component",
        label: Paintbrush,
        command: "open-sm",
        active: true,
        togglable: false,
        attributes: { id: "style-component", title: t("styleComponent") },
        tagName: "button",
      },
      {
        id: "edit-component-settings",
        label: Settings,
        command: "open-tm",
        togglable: false,
        attributes: {
          id: "edit-component-settings",
          title: t("editComponentSettings"),
        },
        tagName: "button",
      },
    ],
  };
};

export const LayoutTabs = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "layout-tabs",
    buttons: [
      {
        id: "view-layers",
        label: Layers,
        command: "open-layers",
        togglable: false,
        attributes: { id: "view-layers", title: t("viewLayers") },
        tagName: "button",
      },
      {
        id: "add-blocks",
        label: Blocks,
        command: "open-blocks",
        togglable: false,
        attributes: { id: "add-blocks", title: t("addBlocks") },
        tagName: "button",
      },
    ],
  };
};

export const handleTabs = (editor: Editor) => {
  editor.on("load", () => {
    const styles = {
      wrapper: document.querySelector("#styles-panel-wrapper") as HTMLElement,
      input: document.querySelector("#styles") as HTMLInputElement,
    };

    const traits = {
      wrapper: document.querySelector("#traits-panel-wrapper") as HTMLElement,
      input: document.querySelector("#traits") as HTMLInputElement,
    };

    styles.wrapper.hidden = true;
    styles.input.disabled = true;

    traits.wrapper.hidden = true;
    traits.input.disabled = true;
  });

  editor.on("style:target", (e) => {
    editor.StyleManager.getSectors().each((sector: Sector) => sector.set({ open: true }));

    const hideStyles = !e?.attributes.stylable;
    const hideTraits = !e?.attributes.traits?.length;

    const styles = {
      wrapper: document.querySelector("#styles-panel-wrapper") as HTMLElement,
      input: document.querySelector("#styles") as HTMLInputElement,
    };

    const traits = {
      wrapper: document.querySelector("#traits-panel-wrapper") as HTMLElement,
      input: document.querySelector("#traits") as HTMLInputElement,
    };

    styles.wrapper.hidden = hideStyles;
    styles.input.disabled = hideStyles;

    traits.wrapper.hidden = hideTraits;
    traits.input.disabled = hideTraits;

    if (hideStyles) {
      traits.input.checked = true;
    };

    if (hideTraits) {
      styles.input.checked = true;
    };
  });
};
