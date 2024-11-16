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
import BaseInput from "../base/forms/BaseInput.vue";
import Header from "../base/Header.vue";

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
  BaseInput: BaseInput,
  Header: Header,
};
</script>

<style scoped></style>
