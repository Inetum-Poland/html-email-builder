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
import { ColumnBlock, TextBlock, HeadingBlock, HeroBlock, ImageBlock, ButtonBlock } from "./blocks";
import { DeviceManager, TabSwitcher, Toolbar } from "./panels";

onMounted(() => {
  const editor = grapesJS.init({
    fromElement: true,
    storageManager: false,
    container: "#gjs",
    height: "100%",
    plugins: [grapesJSMJML],
    telemetry: false,
    pluginsOpts: {
      [grapesJSMJML as any]: {
        blocks: [],
      }
    },
  });

  const { Blocks, Panels } = editor;

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
  Blocks.add("mj-4-columns", ColumnBlock(4));
  Blocks.add("mj-text", TextBlock());
  Blocks.add("mj-heading-1", HeadingBlock(1));
  Blocks.add("mj-heading-2", HeadingBlock(2));
  Blocks.add("mj-heading-3", HeadingBlock(3));
  Blocks.add("mj-hero", HeroBlock());
  Blocks.add("mj-image", ImageBlock());
  Blocks.add("mj-button", ButtonBlock());
});
</script>

<style>
@import url("grapesjs/dist/css/grapes.min.css");
@import url("~/assets/styles/editor.css");
</style>
