<template>
  <BaseSideBar>
    <DynamicForm
      v-if="settingsFieldSet"
      :fields="settingsFieldSet"
      :formId="currentFieldId"
      :key="currentFieldId"
      @formSubmit="onFormSettingsSubmit"
      @onDelete="onFieldDelete"
      :loadedState="loadedState"
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
          :id="item?.id"
          @drop="onDrop($event)"
          @dragover.capture="onComponentDragOver"
          @click="openSidebar"
          draggable="true"
          @dragstart="startDrag($event)"
          @drag="onDrag"
        >
          <component
            v-if="item?.component"
            :is="componentsMap?.[item?.component]"
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
    <div class="form-components">
      <div
        class="dragable-object"
        @dragstart="startDrag($event)"
        @drag="onDrag"
        draggable="true"
        id="BaseTextInput"
      >
        <IconTextInput /> <span>Text Input</span>
      </div>
      <div
        class="dragable-object"
        @dragstart="startDrag($event)"
        @drag="onDrag"
        draggable="true"
        id="BaseTextarea"
      >
        <IconTextArea /> <span>Text Area</span>
      </div>
      <div
        class="dragable-object"
        @dragstart="startDrag($event)"
        @drag="onDrag"
        draggable="true"
        id="BaseSelect"
      >
        <IconSelect /> <span>Select</span>
      </div>
      <div
        class="dragable-object"
        @dragstart="startDrag($event)"
        @drag="onDrag"
        draggable="true"
        id="BaseDateInput"
      >
        <IconCalendar /> <span>Date Input</span>
      </div>
      <div
        class="dragable-object"
        @dragstart="startDrag($event)"
        @drag="onDrag"
        draggable="true"
        id="BaseDateRange"
      >
        <IconCalendarRange /> <span>Date Range</span>
      </div>
      <div
        class="dragable-object"
        @dragstart="startDrag($event)"
        @drag="onDrag"
        draggable="true"
        id="BaseCheckbox"
      >
        <IconCheckbox /> <span>Checkbox</span>
      </div>
      <div
        class="dragable-object"
        @dragstart="startDrag($event)"
        @drag="onDrag"
        draggable="true"
        id="BaseRadio"
      >
        <IconRadio /> <span>Radio Input</span>
      </div>
    </div>
    <div class="form-controls">
      <button @click="onFormPreview" class="secondary">Preview</button>

      <button @click="onFormSave">Save form</button>
      <button @click="onFormLoad">Load saved form</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Component } from "@vue/runtime-core";
import componentsMap from "@/models/components/componentsMap";
import { elementsMap } from "@/helpers/formSettingsMap";
import { useFormBuilderState } from "@/composables/useFormBuilderState";
import { useSavedForms } from "@/composables/useSavedForms";
import type { FieldsState, Field } from "@/types";
import type { Ref } from "@vue/reactivity";

const router = useRouter();
const route = useRoute();

const {
  getLastFormId,
  setSavedForms,
  setPresavedForm,
  getSavedForms,
  getSavedFormById,
} = useSavedForms();

const formId = ref<number | string>(getLastFormId() + 1);
let loadedItems = [];
const loadedState = ref<FieldsState | undefined>();
if (route.params.id) {
  formId.value = route.params.id;
  loadedItems = getSavedFormById(formId.value)?.form;
  console.log(loadedItems, "loadedItems");
}

const { formItems } = useFormBuilderState(formId.value, loadedItems);
const {
  startDrag,
  onDrop,
  onComponentDragEnter,
  onComponentDragOver,
  onConstructorAreaDragEnter,
  onConstructorAreaDragLeave,
  onDrag,
  setConstructorArea,
} = useFormDrop({
  constructorAreaSelector: "#constructor-free-drop",
  formId: formId.value,
});
setConstructorArea();
const settingsFieldSet = shallowRef<null | Field[]>(null);
const currentFieldId = ref();

const { toggleActive } = useSidebar();

function openSidebar(e: Event) {
  if (!(e.target instanceof HTMLElement)) return;
  const dataName = e.target.dataset?.name;
  if (dataName && dataName in elementsMap) {
    settingsFieldSet.value = elementsMap?.[dataName]?.();
    console.log(e.target.id);
    currentFieldId.value = e.target.id;
    if (loadedItems?.length) {
      loadedState.value = loadedItems.find((f) => f.id === e.target.id)?.props;
    }
  } else {
    settingsFieldSet.value = null;
  }
  toggleActive();
}

console.log(formItems, "formItems");

function onFormSettingsSubmit(state: Ref) {
  const fieldIndex = formItems?.value.findIndex(
    (e) => e.id == currentFieldId.value
  );
  const fieldItem = formItems.value[fieldIndex];
  fieldItem.props = {
    ...formItems?.value[fieldIndex]?.props,
    ...state.value,
  };
  fieldItem.fieldName =
    fieldItem?.props?.label ||
    fieldItem?.props?.placeholder ||
    fieldItem?.props?.name;
  toggleActive();
}
function onFieldDelete(fieldId: string | number | null) {
  const userConfirm = confirm("Are you sure, you want to delete this field?");
  if (userConfirm) return;
  formItems.value = formItems?.value.filter((e) => e.id != fieldId);
  currentFieldId.value = null;
  settingsFieldSet.value = null;
  toggleActive();
}
function onFormSave() {
  setSavedForms({ id: formId.value, form: [...formItems.value] });
}
function onFormLoad() {
  const savedForm = getSavedForms()?.[0];
  console.log(savedForm, "savedForm");
  router.push(`/edit/${savedForm.id}`);
}
function onFormPreview() {
  setPresavedForm({ id: formId.value, form: [...formItems.value] });
  router.push(`/preview/${formId.value}`);
}
</script>

<style scoped></style>
