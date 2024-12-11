import type { PanelProperties } from "grapesjs";
import { Scan } from "lucide-static";

export const ToggleBorders = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    appendTo: "#top-bar",
    id: "toggle-borders-panel",
    buttons: [
      {
        attributes: { title: t("toggleBorders") },
        command: "sw-visibility",
        id: "toggle-borders",
        label: Scan,
        tagName: "button",
      },
    ],
  };
};
