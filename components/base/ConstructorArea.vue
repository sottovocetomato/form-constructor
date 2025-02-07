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
      <button class="btn-danger" @click="onFormDelete" v-if="editMode">
        Delete form
      </button>
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
  checkFormExistsByName,
  deleteSavedForm,
} = useSavedForms();

const formId = ref<number | string>(getLastFormId() + 1);
let loadedItems: Field[] | undefined;
const loadedState = ref<FieldsState>();

const editMode = computed(() => !!route?.params?.id);

if (editMode) {
  formId.value = +route.params.id;
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
  const target = e.target as HTMLElement;
  const dataName = target.dataset?.name;
  const loadedForm = loadedItems
    ? loadedItems?.find((f) => f.id === target.id)
    : null;
  if (dataName && dataName in elementsMap) {
    currentFieldId.value = target.id;
    if (loadedForm && Array.isArray(loadedForm?.settingsFields)) {
      settingsFieldSet.value = [...loadedForm.settingsFields];
      loadedState.value = loadedForm?.props;
    } else {
      settingsFieldSet.value = elementsMap?.[dataName]?.();
    }
  } else {
    settingsFieldSet.value = null;
  }
  toggleActive();
}

console.log(formItems, "formItems");

function onFormSettingsSubmit(state: Ref, fieldsSet: Ref) {
  const fieldIndex = formItems?.value.findIndex(
    (e) => e.id == currentFieldId.value
  );
  console.log(state.value, "state");
  const fieldItem = formItems.value[fieldIndex];
  console.log(
    formItems?.value[fieldIndex]?.props,
    "formItems?.value[fieldIndex]?.props"
  );
  fieldItem.props = {
    ...formItems?.value[fieldIndex]?.props,
    ...state.value,
  };
  console.log(fieldItem.props, "fieldItem.props");
  console.log(formItems.value, "formItems.value");
  fieldItem.fieldName =
    fieldItem?.props?.label ||
    fieldItem?.props?.placeholder ||
    fieldItem?.props?.name;

  fieldItem.settingsFields = fieldsSet.value;
  toggleActive();
}
function onFieldDelete(fieldId: string | number | null) {
  const userConfirm = confirm("Are you sure, you want to delete this field?");
  if (!userConfirm) return;
  formItems.value = formItems?.value.filter((e) => e.id != fieldId);
  currentFieldId.value = null;
  settingsFieldSet.value = null;
  toggleActive();
}
function onFormSave() {
  let name = prompt("Enter form's name");
  if (!name) {
    alert("No valid name was provided!");
    onFormSave();
  }

  const exists = checkFormExistsByName(name as string);
  if (exists) {
    alert("Form with this name already exists, please select different name!");
    onFormSave();
  }
  setSavedForms({
    id: formId.value,
    name: name as string,
    form: [...formItems.value],
  });
}
function onFormLoad() {
  const savedForm = getSavedForms()?.[0];
  console.log(savedForm, "savedForm");
  router.push(`/edit/${savedForm.id}`);
}
function onFormDelete() {
  const userConfirm = confirm("Are you sure you want to delete this form?");
  if (!userConfirm) return;
  deleteSavedForm(formId.value);
  router.push("/saved-forms");
}
function onFormPreview() {
  setPresavedForm({ id: formId.value, form: [...formItems.value] });
  router.push(`/preview/${formId.value}`);
}
</script>

<style scoped></style>
