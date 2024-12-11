<script setup>
import Tab from "./Tab.vue";

defineProps({
  name: String,
  tabs: [{
    id: String,
    label: String,
    hidden: Boolean,
  }],
});
</script>

<template>
  <div :id="name">
    <div class="tabset">
      <Tab
        v-for="tab in tabs"
        :id="tab.id"
        :key="tab.id"
        :name="name"
        :checked="tabs[0].id === tab.id"
        :label="tab.label"
      />

      <div class="tab-panels">
        <section
          v-for="tab in tabs"
          :id="`${tab.id}-panel-wrapper`"
          :key="tab.id"
          :hidden="tab.hidden"
          class="tab-panel"
        >
          <div :id="`${tab.id}-panel`" />
        </section>
      </div>
    </div>
  </div>
</template>

<style>
@import url("~/assets/styles/tabs.css");
</style>
