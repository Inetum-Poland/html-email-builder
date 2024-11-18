import type { PanelProperties } from "grapesjs";
import { Paintbrush, Settings, Layers, Blocks } from "lucide-static";

export const TabSwitcher = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "tab-switcher",
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
