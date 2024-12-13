<script setup>
import { useDark } from "@vueuse/core";
import { MoonStar, Sun } from "lucide-static";

const { $i18n: { t } } = useNuxtApp();

const isDark = useDark({
  selector: "body",
  attribute: "theme",
  valueDark: "dark",
  valueLight: "light",
});

const toggle = useToggle(isDark);
</script>

<template>
  <button
    class="theme-toggle"
    :title="t('toggleTheme')"
    @click="toggle()"
  >
    <div
      v-if="isDark"
      v-html="MoonStar"
    />
    <div
      v-else
      v-html="Sun"
    />
  </button>
</template>

<style>
@import url("~/assets/styles/theme-toggle.css");
</style>
