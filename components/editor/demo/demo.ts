import type { Editor } from "grapesjs";
import { driver } from "driver.js";
import { WelcomeModal } from "@modals";
import "driver.js/dist/driver.css";

const click = (selector: string) => {
  const element: HTMLElement | null = document.querySelector(selector);

  if (element) {
    element.click();
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
        element: ".gjs-pn-device-manager",
        popover: {
          title: t("demo.previewMode.title"),
          description: t("demo.previewMode.description"),
        },
      },
      {
        element: "#layout-panel",
        popover: {
          title: t("demo.addBlocks.title"),
          description: t("demo.addBlocks.description"),
        },
      },
      {
        element: "#layout-panel .gjs-block-category:nth-of-type(1)",
        popover: {
          title: t("demo.columns.title"),
          description: t("demo.columns.description"),
        },
      },
      {
        element: "#layout-panel .gjs-block-category:nth-of-type(2)",
        popover: {
          title: t("demo.tables.title"),
          description: t("demo.tables.description"),
        },
      },
      {
        element: "#layout-panel .gjs-block-category:nth-of-type(3)",
        popover: {
          title: t("demo.blocks.title"),
          description: t("demo.blocks.description"),
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
        element: "#layout-panel",
        popover: {
          title: t("demo.viewLayers.title"),
          description: t("demo.viewLayers.description"),
        },
        onHighlightStarted: () => click("#layers-label"),
        onDeselected: () => click("#blocks-label")
      },
      {
        element: "#component-panel",
        popover: {
          title: t("demo.styleComponents.title"),
          description: t("demo.styleComponents.description"),
        },
        onHighlightStarted: () => click("#styles-label"),
      },
      {
        element: "#component-panel",
        popover: {
          title: t("demo.editHTMLAttributes.title"),
          description: t("demo.editHTMLAttributes.description"),
        },
        onHighlightStarted: () => click("#traits-label"),
        onDeselected: () => click("#styles-label")
      },
      {
        element: ".gjs-pn-toggle-autosave-panel",
        popover: {
          title: t("demo.toggleAutosave.title"),
          description: t("demo.toggleAutosave.description"),
        },
      },
      {
        element: ".gjs-pn-state-panel",
        popover: {
          title: t("demo.saveChanges.title"),
          description: t("demo.saveChanges.description"),
          nextBtnText: t("okay!"),
        },
      },
    ],
  }).drive();
};
