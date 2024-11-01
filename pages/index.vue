<template>
  <div class="constructor-area-wrap">
    <div
      class="constructor-area"
      ref="constructorArea"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
    >
      <component
        class="constructor-area__component"
        v-for="(item, index) in items"
        :is="componentsMap[item]"
        :key="`${item}-${index}`"
        @dragover.prevent
        @dragover="onComponentDragEnter"
        @dragleave="onComponentDragLeave"
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
import { ComponentsMap } from "#build/types";

const componentsMap: ComponentsMap = {
  BaseInput: BaseInput,
};

const items = ref<string[]>([]);
const constructorArea = ref<HTMLDivElement>(null);

function startDrag(evt): void {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("itemID", evt.target?.id);
}
function onDrop(evt): void {
  let prependZone = document.querySelector("#drop-insert-place");
  if (prependZone) return;
  const itemID = evt.dataTransfer.getData("itemID");
  items.value.push(itemID);

  evt.target.classList.remove("active");
}
function onDragEnter(evt): void {
  let prependZone = document.querySelector("#drop-insert-place");
  if (prependZone) return;
  evt.target.classList.add("active");
}

function onDragLeave(evt): void {
  // let prependZone = document.querySelector("#drop-insert-place");
  // if (prependZone) prependZone.remove();
  evt.target.classList.remove("active");
}

function onComponentDragEnter(e): void {
  console.log("enter");
  if (process.client) {
    e.preventDefault();
    let prependZone = document.querySelector("#drop-insert-place");
    if (!prependZone) {
      prependZone = document.createElement("div");
      prependZone.id = "drop-insert-place";
      // console.log(prependZone);
      // console.log(e.target, "e.target");
      constructorArea.value.insertBefore(prependZone, e.target);
    }
  }
}
function onComponentDragLeave(e): void {
  console.log("leave");
  if (process.client) {
    e.preventDefault();
    let prependZone = document.querySelector("#drop-insert-place");
    if (!prependZone) return;
    prependZone.remove();
  }
}
</script>

<style scoped></style>
