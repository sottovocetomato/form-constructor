<template>
  <div :class="['sidebar-wrap', customWrapClass]">
    <div :class="['sidebar-content', customContentClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  customWrapClass?: string;
  customContentClass?: string;
}
const { customContentClass = "", customWrapClass = "" } = defineProps<Props>();
</script>

<style scoped></style>
