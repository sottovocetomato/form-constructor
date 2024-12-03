<template>
  <form :class="mainWrapClass" @submit.prevent v-if="fieldsSet.length">
    <!--    <div-->
    <!--      class=""-->
    <!--      v-for="(field, index) in fieldsSet"-->
    <!--      :key="`${field}-${index}`"-->
    <!--      :data-index="index"-->
    <!--    >-->
    <!--      <component-->
    <!--        v-if="field.isGroup"-->
    <!--        v-for="groupField in field.groupFields"-->
    <!--        :is="componentsMap[groupField?.component] || groupField?.component"-->
    <!--        v-bind="groupField.props"-->
    <!--        v-model="groupField.stateBlock[groupField.fieldName]"-->
    <!--        @click="-->
    <!--          groupField?.onClick ? groupField?.onClick(fieldsSet, $event) : null-->
    <!--        "-->
    <!--        >{{ groupField.innerText }}</component-->
    <!--      >-->
    <!--      <component-->
    <!--        v-else-if="!field.isGroup && field?.component"-->
    <!--        :is="componentsMap[field?.component] || field?.component"-->
    <!--        v-bind="field.props"-->
    <!--        v-model="field.stateBlock[field.fieldName]"-->
    <!--        @click="field?.onClick ? field?.onClick(fieldsSet, $event) : null"-->
    <!--        >{{ field.innerText }}</component-->
    <!--      >-->
    <!--    </div>-->
    <dynamicComponent />
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
import { isArrayOfArrays } from "@/helpers";

const currentFormId = useId();
const componentsMap: ComponentsMap = {
  BaseTextInput: BaseTextInput,
  BaseTextarea: BaseTextarea,
  BaseSelect: BaseSelect,
  BaseDateInput: BaseDateInput,
  BaseCheckbox: BaseCheckbox,
};
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
const dynamicComponent = h(
  "div",
  fieldsSet.map((field, ind) => {
    if (field.isGroup) {
      const nodes = dynamicFieldsRenderer(field.groupFields);
      console.log(nodes, "nodes");
      return h("div", nodes);
    }
    return h("h1", "hello not is group");
  })
);

function dynamicFieldsRenderer(entryFields, nodes = []) {
  const arrayOfArrays = isArrayOfArrays(entryFields);
  if (arrayOfArrays) {
    for (const fieldArr of entryFields) {
      dynamicFieldsRenderer(fieldArr, nodes);
    }
  } else {
    for (const field of entryFields) {
      const node = h(
        componentsMap[field.component],
        {
          ...field.props,
          modelValue: field.stateBlock[field.fieldName],
          "onUpdate:modelValue": (value) =>
            this.$emit("update:modelValue", value),
          onClick: (e) => {
            field?.onClick ? field?.onClick(fieldsSet, e) : null;
          },
        },
        field.innerText
      );
      nodes.push(node);
    }
  }
  return nodes;
}

console.log(fieldsState?.value, "fieldsState");
console.log(fieldsSet, "fieldsSet");

function logger() {
  console.log(fieldsState, "logger");
}
function onFormSubmit() {
  console.log(fieldsState, "fieldsState");
  emit("formSubmit", fieldsState);
}
</script>

<style scoped></style>
