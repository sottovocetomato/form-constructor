<template>
  <div class="constructor-area-wrap">
    <div
      class="constructor-area"
      id="constructor-drop"
      ref="constructorArea"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
    >
      <component
        class="constructor-area__component"
        v-for="(item, index) in items"
        :data-index="index"
        :is="componentsMap[item]"
        :key="`${item}-${index}`"
        @drop="onDrop($event)"
        @dragover="onComponentDragOver"
      />
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
      draggable="true"
      id="Header"
    >
      This is HEADER
    </div>
  </aside>
</template>

<script setup lang="ts">
import BaseInput from "../components/base/BaseInput.vue";
import Header from "../components/base/Header.vue";

import type { Component } from "@vue/runtime-core";
import { ComponentsMap } from "#build/types";

const componentsMap: ComponentsMap = {
  BaseInput: BaseInput,
  Header: Header,
};

const items = ref<string[]>([]);
const constructorArea = ref<HTMLDivElement>(null);

function onDrag(e): void {
  console.log(e.clientX, "onDrag");
  console.log(e.clientY, "onDrag");
  const { bottom, top, left, right } =
    constructorArea.value.getBoundingClientRect();
  const isOutOfBounds =
    e.clientY > bottom ||
    e.clientY < top ||
    e.clientX < left ||
    e.clientX > right;

  if (isOutOfBounds) {
    let prependZone = document.querySelector("#drop-insert-place");
    if (!prependZone) return;
    prependZone.remove();
  }
}
function startDrag(evt): void {
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("itemID", evt.target?.id);
}
function onDrop(evt): void {
  console.log(evt.target, "dropping");
  evt.stopImmediatePropagation();
  let prependZone = document.querySelector("#drop-insert-place");
  // if (prependZone) return;
  const itemID = evt.dataTransfer.getData("itemID");
  console.log(evt.target.id);
  if (evt.target.id === "constructor-drop") {
    items.value.push(itemID);
    evt.target.classList.remove("active");
  } else {
    const ind = evt.target.dataset.index;
    console.log(ind);
    items.value.splice(ind, 0, itemID);
  }
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
// function onComponentDragLeave(e): void {
//   console.log(e.target.getBoundingClientRect(), "leave");
//   const { bottom, top, right, left } = e.target.getBoundingClientRect();
//   console.log(e.clientX, e.clientY, "leave");
//   const isVerticalLeave =
//     Math.floor(bottom) - e.clientY <= 1 || Math.floor(top) - e.clientY >= 1;
//   const isHorizontalLeave =
//     Math.floor(right) - e.clientX <= 1 || Math.floor(left) - e.clientX >= 1;
//   if (isHorizontalLeave) {
//     let prependZone = document.querySelector("#drop-insert-place");
//     if (!prependZone) return;
//     prependZone.remove();
//   }
// }
function onComponentDragOver(e): void {
  e.preventDefault();
  //смотрим, куда прёт курсор: если ниже, отвязываем, если выше, то даём управление добавленному элементу
  if (process.client) {
    const checkDirectionVertical =
      e.target.getBoundingClientRect().bottom -
        e.target.getBoundingClientRect().height / 2 >
      e.clientY
        ? "up"
        : "down";
    const isOutHotizontally =
      e.target.getBoundingClientRect().left > e.clientX ||
      e.target.getBoundingClientRect().right < e.clientX;

    // console.log(e.clientY);
    console.log(e.target.getBoundingClientRect());
    console.log(e.clientX);
    let prependZone = document.querySelector("#drop-insert-place");
    if (!prependZone) {
      prependZone = document.createElement("div");
      prependZone.id = "drop-insert-place";
    }
    if (isOutHotizontally) {
      prependZone.remove();
      return;
    }
    if (checkDirectionVertical === "down") {
      console.log(e.target.nextSibling, "e.target.nextSibling");
      if (
        e.target.nextSibling &&
        e.target.nextSibling.classList?.contains("constructor-area__component")
      ) {
        constructorArea.value.insertBefore(prependZone, e.target.nextSibling);
      }
    } else {
      constructorArea.value.insertBefore(prependZone, e.target);
    }
  }
}
</script>

<style scoped></style>
