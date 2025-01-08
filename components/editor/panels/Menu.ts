import type { Editor, PanelProperties } from "grapesjs";
import { Menu as MenuIcon } from "lucide-static";
import { WelcomeModal } from "@modals";

export const Menu = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    appendTo: "#menu",
    id: "menu-panel",
    buttons: [
      {
        attributes: { title: t("createNewProject") },
        command: (editor: Editor) => WelcomeModal(editor, { hideAutosaveOption: true }),
        id: "menu",
        label: MenuIcon,
        tagName: "button",
      },
    ],
  };
};
