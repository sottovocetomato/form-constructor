<template>
  <BaseSideBar>
    <DynamicForm
      mainWrapClass="super-form"
      :fields="settingsFieldSet"
      :formId="currentFormId"
      :key="currentFormId"
      @formSubmit="onFormSettingsSubmit"
    />
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
          <component
            :is="componentsMap[item.component]"
            v-bind="item.props"
            customWrapClass="constructor-area__component__element"
          />
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
      id="BaseTextInput"
    >
      Text Input
    </div>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      @drag="onDrag"
      draggable="true"
      id="BaseTextarea"
    >
      Text Area
    </div>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      @drag="onDrag"
      draggable="true"
      id="BaseSelect"
    >
      Select
    </div>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      @drag="onDrag"
      draggable="true"
      id="BaseDateInput"
    >
      Date Input
    </div>
    <div
      class="dragable-object"
      @dragstart="startDrag($event)"
      @drag="onDrag"
      draggable="true"
      id="BaseCheckbox"
    >
      Checkbox
    </div>
    <button @click="onFormSave">Сохранить форму</button>
  </aside>
</template>

<script setup lang="ts">
import BaseTextInput from "../components/base/forms/BaseTextInput";
import BaseTextarea from "../components/base/forms/BaseTextarea";
import BaseSelect from "../components/base/forms/BaseSelect";
import BaseDateInput from "../components/base/forms/BaseDateInput";
import BaseCheckbox from "../components/base/forms/BaseCheckbox";

import type { Component } from "@vue/runtime-core";
import { ComponentsMap } from "@/types";
import { elementsMap } from "@/helpers/formSettingsMap";
import { useFormBuilderState } from "@/composables/useFormBuilderState";

const componentsMap: ComponentsMap = {
  BaseTextInput: BaseTextInput,
  BaseTextarea: BaseTextarea,
  BaseSelect: BaseSelect,
  BaseDateInput: BaseDateInput,
  BaseCheckbox: BaseCheckbox,
};
const { formItems } = useFormBuilderState();
const {
  startDrag,
  onDrop,
  onComponentDragEnter,
  onComponentDragOver,
  onConstructorAreaDragEnter,
  onConstructorAreaDragLeave,
  onDrag,
} = useFormDrop({ constructorAreaSelector: "#constructor-free-drop" });

const settingsFieldSet = shallowRef([]);
const currentFormId = ref(null);

const { toggleActive } = useSidebar();
function openSidebar(e) {
  const dataName = e.target.dataset?.name;

  if (dataName in elementsMap) {
    settingsFieldSet.value = elementsMap?.[dataName];
    currentFormId.value = e.target.dataset?.index;
  } else {
    settingsFieldSet.value = "";
  }
  toggleActive();
}

function onFormSettingsSubmit(state) {
  formItems.value[currentFormId?.value].props = {
    ...formItems?.value[currentFormId?.value]?.props,
    ...state.value,
  };
  toggleActive();
}
function onFormSave(state) {
  console.log(formItems.value, "currentSavedForm");
}
</script>

<style scoped></style>
