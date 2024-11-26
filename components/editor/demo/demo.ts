import type { Editor } from "grapesjs";
import { driver } from "driver.js";
import { WelcomeModal } from "@modals";
import "driver.js/dist/driver.css";

const click = (selector: string) => {
  const button: HTMLElement | null = document.querySelector(selector);

  if (button) {
    button.click();
  }
};

export const demo = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  driver({
    onDestroyed: () => WelcomeModal(editor),
    popoverClass: "demo-popover",
    showProgress: true,
    steps: [
      {
        element: ".gjs-frame",
        popover: {
          title: t("demo.buildingAnEmail.title"),
          description: t("demo.buildingAnEmail.description"),
        },
      },
      {
        element: ".gjs-pn-buttons",
        popover: {
          title: t("demo.previewMode.title"),
          description: t("demo.previewMode.description"),
        },
      },
      {
        element: ".gjs-pn-state-panel",
        popover: {
          title: t("demo.saveChanges.title"),
          description: t("demo.saveChanges.description"),
        },
      },
      {
        element: "#copy-document-button",
        popover: {
          title: t("demo.copyToOutlook.title"),
          description: t("demo.copyToOutlook.description"),
        },
      },
      {
        element: "#export-project-button",
        popover: {
          title: t("demo.saveAs.title"),
          description: t("demo.saveAs.description"),
        },
      },
      {
        element: ".gjs-pn-toggle-autosave-panel",
        popover: {
          title: t("demo.toggleAutosave.title"),
          description: t("demo.toggleAutosave.description"),
        },
      },
      {
        element: "#style-component",
        popover: {
          title: t("demo.styleComponents.title"),
          description: t("demo.styleComponents.description"),
        },
        onHighlightStarted: () => click("#style-component")
      },
      {
        element: "#edit-component-settings",
        popover: {
          title: t("demo.editHTMLAttributes.title"),
          description: t("demo.editHTMLAttributes.description"),
        },
        onHighlightStarted: () => click("#edit-component-settings")
      },
      {
        element: "#view-layers",
        popover: {
          title: t("demo.viewLayers.title"),
          description: t("demo.viewLayers.description"),
        },
        onHighlightStarted: () => click("#view-layers")
      },
      {
        element: "#add-blocks",
        popover: {
          title: t("demo.addBlocks1.title"),
          description: t("demo.addBlocks1.description"),
        },
        onHighlightStarted: () => click("#add-blocks")
      },
      {
        element: ".gjs-blocks-cs",
        popover: {
          title: t("demo.addBlocks2.title"),
          description: t("demo.addBlocks2.description"),
        },
      },
      {
        element: "#image-block",
        popover: {
          title: t("demo.addImages.title"),
          description: t("demo.addImages.description"),
        },
      },
      {
        element: "#table-block",
        popover: {
          title: t("demo.addTables.title"),
          description: t("demo.addTables.description"),
          nextBtnText: t("okay!"),
        },
      },
    ],
  }).drive();
};
