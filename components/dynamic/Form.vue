<template>
  <form
    :class="[mainWrapClass ? mainWrapClass : 'composed-form']"
    @submit.prevent
    v-if="fieldsSet.length"
  >
    <div class="composed-form__content">
      <dynamicComponent />
    </div>
    <button v-if="!noSubmitBtn" type="submit" @click="onFormSubmit">
      Сохранить
    </button>
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
  noSubmitBtn = false,
} = defineProps<DynamicFormProps>();

const { fieldsState, fieldsSet } = useDynamicForm(
  fields,
  formId ?? currentFormId
);

const dynamicComponent = () => {
  return h(
    "div",
    fieldsSet.map((field, ind) => {
      if (field?.isGroup) {
        const nodes = dynamicFieldsRenderer(field.groupFields);
        // console.log(nodes, "nodes");
        return h("div", nodes);
      }
      return createComponent(field);
    })
  );
};

function dynamicFieldsRenderer(entryFields, nodes = []) {
  const arrayOfArrays = isArrayOfArrays(entryFields);
  if (arrayOfArrays) {
    for (const fieldArr of entryFields) {
      dynamicFieldsRenderer(fieldArr, nodes);
    }
  } else {
    for (const field of entryFields) {
      const node = createComponent(field);
      nodes.push(node);
    }
  }
  return nodes;
}

function createComponent(field) {
  let stateBlock = fieldsState.value;
  if (field?.stateBlock) {
    stateBlock = field?.stateBlock?.split(".")?.reduce((p, n) => {
      return p[n];
    }, fieldsState.value);
  }
  return h(
    componentsMap[field.component] || field.component,
    {
      ...field.props,
      modelValue: stateBlock[field.fieldName],
      "onUpdate:modelValue": (value) => {
        if (field.fieldName) {
          stateBlock[field.fieldName] = value;
          emit("update:modelValue", value);
        }
      },
      onClick: (e) => {
        field?.onClick ? field?.onClick(fieldsSet, e) : null;
      },
    },
    field.innerText
  );
}

function logger() {
  console.log(fieldsState, "logger");
}
function onFormSubmit() {
  console.log(fieldsState, "fieldsState");
  console.log(fieldsSet, "fieldsSet");
  emit("formSubmit", fieldsState);
}
</script>

<style scoped></style>
