<template>
  <div id="grapes">
    <div id="editor">
      <mjml>
        <mj-body />
      </mjml>
    </div>

    <div id="nav-bar">
      <Logo />
      <nav class="buttons">
        <div id="menu" />
        <ThemeToggle />
      </nav>
    </div>
    <div id="top-bar" />
    <div id="bottom-bar" />

    <Tabs
      name="layout-panel"
      :tabs="[
        {
          id: 'blocks',
          label: t('blocks'),
        },
        {
          id: 'layers',
          label: t('layers'),
        }
      ]"
    />

    <Tabs
      name="component-panel"
      :tabs="[
        {
          id: 'styles',
          label: t('styles'),
          hidden: true,
        },
        {
          id: 'traits',
          label: t('attributes'),
        }
      ]"
    />

    <div id="credit">
      <p>
        {{ t("credit.madeWithLove") }}
        <br>
        {{ t("credit.by") }}
        <br>
        {{ t("credit.year") }}
      </p>
    </div>

    <div
      id="export-menu"
      popover
    />
  </div>
</template>

<script setup lang="ts">
import grapesJS from "grapesjs";
import grapesJSMJML from "grapesjs-mjml";
import mjml2html from "mjml-browser";
import { uploadImage } from "@utils";
import { toggleAutosave } from "@commands";
import { saveProject, selectAll } from "@keymaps";
import { WelcomeModal } from "@modals";
import {
  ButtonBlock,
  ColumnBlock,
  HeadingBlock,
  ImageBlock,
  TablePlugin,
  TextBlock,
  TextToolbar,
  DividerBlock
} from "@blocks";
import {
  DeviceManager,
  ExportProject,
  handleAutosave,
  handleExport,
  handleTabs,
  ToggleAutosavePanel,
  ToggleBorders,
  UndoRedo,
  Menu,
} from "@panels";
import { defaults, setDefaults } from "@defaults";
import { Device } from "@types";

const { $i18n: { t } } = useNuxtApp();

onMounted(() => {
  const editor = grapesJS.init({
    fromElement: true,
    canvas: {
      styles: ["iframe.css"],
    },
    container: "#editor",
    blockManager: {
      appendTo: "#blocks-panel",
    },
    layerManager: {
      appendTo: "#layers-panel"
    },
    styleManager: {
      appendTo: "#styles-panel",
      clearProperties: false,
    },
    traitManager: {
      appendTo: "#traits-panel"
    },
    deviceManager: {
      default: Device.Desktop,
      devices: [
        {
          id: Device.Desktop,
          name: Device.Desktop,
          width: "min(1360px, 100%)",
        },
        {
          id: Device.Mobile,
          name: Device.Mobile,
          width: "min(320px, 100%)",
        },
        {
          id: Device.Tablet,
          name: Device.Tablet,
          width: "min(770px, 100%)",
        },
      ],
    },
    storageManager: {
      autoload: false,
    },
    modal: {
      backdrop: false,
    },
    assetManager: { uploadFile: uploadImage },
    height: "100%",
    plugins: [
      grapesJSMJML,
      TextToolbar,
      ColumnBlock(1),
      ColumnBlock(2),
      ColumnBlock(3),
      TablePlugin,
      TextBlock,
      ButtonBlock,
      ImageBlock,
      HeadingBlock(1),
      HeadingBlock(2),
      HeadingBlock(3),
      DividerBlock,
      handleTabs,
      handleAutosave,
      handleExport,
      setDefaults,
    ],
    telemetry: false,
    noticeOnUnload: true,
    colorPicker: {
      palette: defaults.palette,
    },
    pluginsOpts: {
      [grapesJSMJML as any]: {
        blocks: [],
        columnsPadding: "0 0",
        mjmlParser: (input: string) => mjml2html(input, {
          fonts: {},
        }),
      },
    },
  });

  const { Panels, Keymaps, Commands } = editor;

  editor.on("load", () => WelcomeModal(editor));

  Commands.add("toggle-autosave", toggleAutosave);

  Keymaps.add(
    "custom:save-project",
    "⌘+s, ctrl+s",
    () => saveProject(editor),
    { prevent: true }
  );

  Keymaps.add(
    "custom:select-all",
    "⌘+a, ctrl+a",
    () => selectAll(editor),
    { prevent: true }
  );

  Panels.removePanel("devices-c");
  Panels.removePanel("options");
  Panels.removePanel("buttons");
  Panels.removePanel("commands");
  Panels.removePanel("views");

  Panels.addPanel(ToggleBorders());
  Panels.addPanel(DeviceManager());
  Panels.addPanel(UndoRedo());
  Panels.addPanel(ToggleAutosavePanel());
  Panels.addPanel(ExportProject());
  Panels.addPanel(Menu());
});
</script>

<style>
@import url("grapesjs/dist/css/grapes.min.css");
@import url("~/assets/styles/editor.css");
</style>
