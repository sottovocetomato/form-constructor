<template>
  <form :class="mainWrapClass" @submit.prevent>
    <div
      class=""
      v-for="(field, index) in fields"
      :key="`${field}-${index}`"
      :data-index="index"
    >
      <component
        v-if="field?.component"
        :is="componentsMap[field?.component] || field?.component"
        v-bind="field.props"
        v-model="fieldsState[field.editField]"
        @keyup="logger"
      />
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
}>();

const {
  fields = [],
  data = [],
  mainWrapClass = "",
  formId = null,
} = defineProps<DynamicFormProps>();

const { fieldsState } = useDynamicForm(fields, formId ?? currentFormId);

console.log(fields, "fields");

console.log(fieldsState);

function logger() {
  console.log(fieldsState, "logger");
}
function onFormSubmit() {
  emit("formSubmit", fieldsState);
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
