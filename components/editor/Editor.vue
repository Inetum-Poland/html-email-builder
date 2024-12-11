<template>
  <div id="grapes">
    <div id="editor">
      <mjml>
        <mj-body />
      </mjml>
    </div>

    <div id="top-bar" />
    <div id="bottom-bar" />

    <Tabs
      name="layout-panel"
      :tabs="[
        {
          id: 'blocks',
          label: 'Blocks',
        },
        {
          id: 'layers',
          label: 'Layers',
        }
      ]"
    />

    <Tabs
      name="component-panel"
      :tabs="[
        {
          id: 'styles',
          label: 'Styles',
          hidden: true,
        },
        {
          id: 'traits',
          label: 'Attributes',
        }
      ]"
    />

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
  CellBlock,
  CellImageBlock,
  CellTextBlock,
  ColumnBlock,
  HeadingBlock,
  ImageBlock,
  RowBlock,
  TableBlock,
  TablePlugin,
  TextBlock,
  TextToolbar,
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
} from "@panels";
import { defaults, setDefaults } from "@defaults";
import { Device } from "@types";

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
    plugins: [grapesJSMJML, TablePlugin, TextToolbar],
    telemetry: false,
    noticeOnUnload: true,
    colorPicker: {
      palette: defaults.palette,
    },
    pluginsOpts: {
      [grapesJSMJML as any]: {
        blocks: [],
        mjmlParser: (input: string) => mjml2html(input, {
          fonts: {},
        }),
      },
    },
  });

  const { Blocks, Panels, Keymaps, Commands } = editor;

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

  Blocks.add("mj-1-column", ColumnBlock(1));
  Blocks.add("mj-2-columns", ColumnBlock(2));
  Blocks.add("mj-3-columns", ColumnBlock(3));
  Blocks.add("mj-text", TextBlock());
  Blocks.add("mj-button", ButtonBlock());
  Blocks.add("mj-image", ImageBlock());
  Blocks.add("mj-heading-1", HeadingBlock(1));
  Blocks.add("mj-heading-2", HeadingBlock(2));
  Blocks.add("mj-heading-3", HeadingBlock(3));
  Blocks.add("mj-table", TableBlock());
  Blocks.add("mj-table-row", RowBlock());
  Blocks.add("mj-table-cell", CellBlock());
  Blocks.add("mj-table-cell-text", CellTextBlock());
  Blocks.add("mj-table-cell-image", CellImageBlock());

  handleTabs(editor);
  handleAutosave(editor);
  handleExport(editor);
  setDefaults(editor);
});
</script>

<style>
@import url("grapesjs/dist/css/grapes.min.css");
@import url("~/assets/styles/editor.css");
</style>
