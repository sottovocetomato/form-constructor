<template>
  <div :class="['sidebar-wrap', customWrapClass, isActive ? 'active' : '']">
    <div :class="['sidebar-content', customContentClass]">
      <slot></slot>
    </div>
  </div>
  <div class="sidebar-backdrop" @click="toggleActive"></div>
</template>

<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";

interface Props {
  customWrapClass?: string;
  customContentClass?: string;
}
const { customContentClass = "", customWrapClass = "" } = defineProps<Props>();

const { isActive, toggleActive } = useSidebar();
</script>

<style scoped></style>
