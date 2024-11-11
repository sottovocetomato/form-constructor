<template>
  <div class="constructor-area-wrap">
    <div class="constructor-area">
      <div
        class="constructor-area_form"
        @drop="onDrop($event)"
        @dragover="onComponentDragOver"
      >
        <component
          class="constructor-area__component"
          v-for="(item, index) in formItems"
          :data-index="index"
          :is="componentsMap[item]"
          :key="`${item}-${index}`"
        />
      </div>
      <div
        id="constructor-free-drop"
        ref="constructorArea"
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter="onConstructorAreaDragEnter"
        @dragleave="onConstructorAreaDragLeave"
      ></div>
    </div>
  </div>
  <aside>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      @drag="onDrag"
      draggable="true"
      id="BaseInput"
    >
      This is input
    </div>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      @drag="onDrag"
      draggable="true"
      id="Header"
    >
      This is HEADER
    </div>
  </aside>
</template>

<script setup lang="ts">
import BaseInput from "../components/base/forms/BaseInput.vue";
import Header from "../components/base/Header.vue";

import type { Component } from "@vue/runtime-core";
import { ComponentsMap } from "@/types";
import { useFormDrop } from "@/composables/useFormDrop";
const componentsMap: ComponentsMap = {
  BaseInput: BaseInput,
  Header: Header,
};

const {
  formItems,
  startDrag,
  onDrop,
  onComponentDragEnter,
  onComponentDragOver,
  onConstructorAreaDragEnter,
  onConstructorAreaDragLeave,
  onDrag,
} = useFormDrop({ constructorAreaSelector: "#constructor-free-drop" });
</script>

<style scoped></style>
