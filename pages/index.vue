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
        @dragover="onComponentDragLeave"
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
  if (process.client) {
    e.preventDefault();
    //если prependZone уже есть, но мы на другом элементе (выше/ниже основного компонента), нужно убирать старый препенд и добавлять новый
    let prependZone = document.querySelector("#drop-insert-place");
    if (!prependZone) {
      prependZone = document.createElement("div");
      prependZone.id = "drop-insert-place";
      //привязать drag эвенты, смотреть, куда уходим, отталкиваться от этого

      // console.log(prependZone);
      // console.log(e.target, "e.target");
      constructorArea.value.insertBefore(prependZone, e.target);
    }
  }
}
function onComponentDragLeave(e): void {
  //смотрим, куда прёт курсор: если ниже, отвязываем, если выше, то даём управление добавленному элементу
  if (process.client) {
    const checkDirection =
      e.target.getBoundingClientRect().bottom -
        e.target.getBoundingClientRect().height / 2 >
      e.clientY
        ? "up"
        : "down";
    console.log(checkDirection, "checkDirection");
    // console.log(e.clientY);
    // console.log(e.target.getBoundingClientRect());
    let prependZone = document.querySelector("#drop-insert-place");
    if (!prependZone) {
      prependZone = document.createElement("div");
      prependZone.id = "drop-insert-place";
    }
    if (checkDirection === "down") {
      constructorArea.value.insertBefore(prependZone, e.target.nextSibling);
    } else {
      constructorArea.value.insertBefore(prependZone, e.target);
    }
  }
}
</script>

<style scoped></style>
