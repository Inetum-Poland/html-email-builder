<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useSeoMeta({
  title: t("meta.title"),
  ogTitle: t("meta.title"),
  description: t("meta.description"),
  ogDescription: t("meta.description"),
});
</script>

<template>
  <VitePwaManifest />
  <Editor />
</template>
