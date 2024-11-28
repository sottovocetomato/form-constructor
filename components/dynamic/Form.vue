<template>
  <form :class="mainWrapClass" @submit.prevent>
    <div
      class=""
      v-for="(field, index) in fieldsSet"
      :key="`${field}-${index}`"
      :data-index="index"
    >
      <component
        v-if="field?.component"
        :is="componentsMap[field?.component] || field?.component"
        v-bind="field.props"
        :modelValue="getModelValue(field)"
        @input="onInput($event, field)"
        @click="field?.onClick ? field?.onClick(fieldsSet, $event) : null"
        >{{ field.innerText }}</component
      >
    </div>
    <button type="submit" @click="onFormSubmit">Сохранить</button>
  </form>
</template>

<script setup lang="ts">
import { DynamicFormProps } from "@/types/interfaces/props";
import BaseTextInput from "../base/forms/BaseTextInput.vue";
import BaseCheckbox from "../base/forms/BaseCheckbox.vue";
import BaseSelect from "../base/forms/BaseSelect.vue";
import BaseTextarea from "../base/forms/BaseTextarea.vue";
import BaseDateInput from "../base/forms/BaseDateInput.vue";

import { ComponentsMap } from "@/types";
const currentFormId = useId();

const emit = defineEmits<{
  formSubmit: [fieldsState?: {}[]];
  "update:modelValue": [e?: Event];
}>();

const {
  fields = [],
  data = [],
  mainWrapClass = "",
  formId = null,
} = defineProps<DynamicFormProps>();

const { fieldsState, fieldsSet } = useDynamicForm(
  fields,
  formId ?? currentFormId
);

console.log(fields, "fields");

console.log(fieldsState);

function getModelValue(field) {
  return field?.isGroup
    ? fieldsSet?.[field.editField]?.[field.groupPosition]
    : fieldsSet?.[field.editField];
}

function logger() {
  console.log(fieldsState, "logger");
}
function onFormSubmit() {
  console.log(fieldsState, "fieldsState");
  emit("formSubmit", fieldsState);
}
function onInput(e, field) {
  console.log(e.target.value, "e");
  if (field?.isGroup) {
    fieldsState.value[field.editField][field.groupPosition] = e.target.value;
  } else {
    fieldsState.value[field.editField] = e.target.value;
  }

  emit("update:modelValue", e.target.value);
}
const componentsMap: ComponentsMap = {
  BaseTextInput: BaseTextInput,
  BaseTextarea: BaseTextarea,
  BaseSelect: BaseSelect,
  BaseDateInput: BaseDateInput,
  BaseCheckbox: BaseCheckbox,
};
</script>

<style scoped></style>
