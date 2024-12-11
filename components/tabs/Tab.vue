<script setup lang="ts">
defineProps({
  id: String,
  label: String,
  name: String,
  checked: Boolean,
});
</script>

<template>
  <input
    :id="id"
    :name="name"
    :aria-controls="id"
    :checked="checked"
    type="radio"
  >
  <label
    :id="`${id}-label`"
    :for="id"
  >
    {{ label }}
  </label>
</template>
