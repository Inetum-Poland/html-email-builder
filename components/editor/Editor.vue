<template>
  <div id="gjs">
    <mjml>
      <mj-body />
    </mjml>
  </div>
</template>

<script setup lang="ts">
import grapesJS from "grapesjs";
import grapesJSMJML from "grapesjs-mjml";
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
} from "./blocks";
import { DeviceManager, TabSwitcher, Toolbar } from "./panels";
import { WelcomeModal } from "./modals";
import { exportProject, Format } from "./panels/components/CodePreview";
import { uploadFile } from "./utils/uploadFile";

onMounted(() => {
  const editor = grapesJS.init({
    fromElement: true,
    container: "#gjs",
    storageManager: {
      autoload: false,
    },
    modal: {
      backdrop: false,
    },
    assetManager: { uploadFile },
    height: "100%",
    plugins: [grapesJSMJML, TablePlugin],
    telemetry: false,
    pluginsOpts: {
      [grapesJSMJML as any]: {
        blocks: [],
      },
    },
  });

  const { Blocks, Panels, Keymaps } = editor;

  editor.on("load", () => WelcomeModal(editor));

  Keymaps.add("ns:save-project", "⌘+s, ctrl+s", () => {
    const json = JSON.stringify(editor.getProjectData(), null, 2);
    exportProject(Format.JSON, json);
  }, {
    prevent: true,
  });

  Panels.removePanel("devices-c");
  Panels.removePanel("options");
  Panels.removePanel("buttons");
  Panels.removePanel("commands");
  Panels.removePanel("views");

  Panels.addPanel(DeviceManager());
  Panels.addPanel(Toolbar());
  Panels.addPanel(TabSwitcher());

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
});
</script>

<style>
@import url("grapesjs/dist/css/grapes.min.css");
@import url("~/assets/styles/editor.css");
</style>
