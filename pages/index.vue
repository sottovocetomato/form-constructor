<template>
  <BaseSideBar>
    <DynamicForm
      v-if="settingsFieldSet"
      :fields="settingsFieldSet"
      :formId="currentFieldId"
      :key="currentFieldId"
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
          :id="`${item.component}-${item.sequenceNumber}`"
          @drop="onDrop($event)"
          @dragover.capture="onComponentDragOver"
          @click="openSidebar"
          draggable="true"
          @dragstart="startDrag($event)"
          @drag="onDrag"
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
      id="BaseDateRange"
    >
      Date Range
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
    <button @click="onFormPreview">Предпросмотр</button>
  </aside>
</template>

<script setup lang="ts">
import BaseTextInput from "../components/base/forms/BaseTextInput";
import BaseTextarea from "../components/base/forms/BaseTextarea";
import BaseSelect from "../components/base/forms/BaseSelect";
import BaseDateInput from "../components/base/forms/BaseDateInput";
import BaseCheckbox from "../components/base/forms/BaseCheckbox";
import BaseDateRange from "../components/base/forms/BaseDateRange";

import type { Component } from "@vue/runtime-core";
import { ComponentsMap } from "@/types";
import { elementsMap } from "@/helpers/formSettingsMap";
import { useFormBuilderState } from "@/composables/useFormBuilderState";
import { useSavedForms } from "@/composables/useSavedForms";

const componentsMap: ComponentsMap = {
  BaseTextInput: BaseTextInput,
  BaseTextarea: BaseTextarea,
  BaseSelect: BaseSelect,
  BaseDateInput: BaseDateInput,
  BaseCheckbox: BaseCheckbox,
  BaseDateRange: BaseDateRange,
};

const router = useRouter();

const { getLastFormId, setSavedForms, setPresavedForm } = useSavedForms();

const formId = ref(getLastFormId() + 1);
const { formItems } = useFormBuilderState(formId.value);
const {
  startDrag,
  onDrop,
  onComponentDragEnter,
  onComponentDragOver,
  onConstructorAreaDragEnter,
  onConstructorAreaDragLeave,
  onDrag,
} = useFormDrop({
  constructorAreaSelector: "#constructor-free-drop",
  formId: formId.value,
});

const settingsFieldSet = shallowRef(null);
const currentFieldId = ref(null);

const { toggleActive } = useSidebar();

function openSidebar(e) {
  const dataName = e.target.dataset?.name;

  if (dataName in elementsMap) {
    settingsFieldSet.value = elementsMap?.[dataName]?.();
    currentFieldId.value = `form-field-${e.target.dataset?.index}`;
  } else {
    settingsFieldSet.value = "";
  }
  toggleActive();
}

console.log(formItems, "formItems");

function onFormSettingsSubmit(state) {
  const fieldIndex = currentFieldId.value.split("form-field-")[1];
  const fieldItem = formItems.value[fieldIndex];
  fieldItem.props = {
    ...formItems?.value[fieldIndex]?.props,
    ...state.value,
  };
  fieldItem.fieldName =
    fieldItem.props.label || fieldItem.placeholder || fieldItem.name;
  toggleActive();
}
function onFormSave() {
  setSavedForms({ id: formId.value, form: [...formItems.value] });
}
function onFormPreview() {
  setPresavedForm({ id: formId.value, form: [...formItems.value] });
  router.push(`/preview/${formId.value}`);
}
</script>

<style scoped></style>
