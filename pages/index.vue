<template>
  <div class="constructor-area-wrap">
    <div
      class="constructor-area"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
    >
      <component
        v-for="(item, index) in items"
        :is="componentsMap[item]"
        :key="`${item}-${index}`"
      />
    </div>
  </div>
  <aside>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      draggable="true"
      id="BaseInput"
    >
      This is input
    </div>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      draggable="true"
      id="Header"
    >
      This is HEADER
    </div>
  </aside>
</template>

<script setup lang="ts">
import BaseInput from "../components/base/BaseInput.vue";
import type { Component } from "@vue/runtime-core";

const componentsMap = {
  BaseInput: BaseInput,
};
const items = ref<string[]>([]);
const instance = getCurrentInstance();
console.log(instance);
// const isComponentExist = (name) => {
//   console.log(instance?.appContext.components[name]);
//   return instance?.appContext.components[name];
// };
function startDrag(evt): void {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("itemID", evt.target?.id);
}
function onDrop(evt): void {
  const itemID = evt.dataTransfer.getData("itemID");
  items.value.push(itemID);
  console.log(itemID, "itemID");
  evt.target.classList.remove("active");
}
function onDragEnter(evt): void {
  evt.target.classList.add("active");
}

function onDragLeave(evt): void {
  evt.target.classList.remove("active");
}
</script>

<style scoped></style>
