<template>
  <BaseSideBar>
    <DynamicForm mainWrapClass="super-form" :fields="settingsFieldSet" />
  </BaseSideBar>
  <div class="constructor-area-wrap">
    <div class="constructor-area">
      <div class="constructor-area_form">
        <div
          class="constructor-area__component"
          v-for="(item, index) in formItems"
          :key="`${item}-${index}`"
          :data-index="index"
          :data-name="item.component"
          @drop="onDrop($event)"
          @dragover.capture="onComponentDragOver"
          @click="openSidebar"
        >
          <component :is="componentsMap[item.component]" :props="item.props" />
        </div>
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

const settingsFieldSet = ref("");

const { toggleActive } = useSidebar();

function openSidebar(e) {
  if (e.target.dataset?.name == "BaseInput") {
    settingsFieldSet.value = fieldsForInput;
  }
  toggleActive();
}

const fieldsForInput = [
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      displayName: "",
      sequenceNumber: 1,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "firs input placeholder",
    },
    editField: "placeholder",
  },
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      displayName: "",
      sequenceNumber: 2,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "firs input placeholder",
    },
    editField: "label",
  },
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      displayName: "",
      sequenceNumber: 3,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "firs input placeholder",
    },
    editField: "isHidden",
  },
];
</script>

<style scoped></style>
