<template>
  <form
    :class="[mainWrapClass ? mainWrapClass : 'composed-form']"
    @submit.prevent
    v-if="fieldsSet.length"
  >
    <div class="composed-form__content" ref="composedForm">
      <dynamicComponent />
    </div>
    <div class="form-controls">
      <button
        v-if="!noDeleteBtn"
        type="submit"
        @click="onDelete"
        class="btn-danger"
      >
        Delete
      </button>
      <button v-if="!noSubmitBtn" type="submit" @click="onFormSubmit">
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { DynamicFormProps } from "@/types/interfaces/props";
import BaseTextInput from "../base/forms/BaseTextInput.vue";
import BaseCheckbox from "../base/forms/BaseCheckbox.vue";
import BaseSelect from "../base/forms/BaseSelect.vue";
import BaseTextarea from "../base/forms/BaseTextarea.vue";
import BaseDateInput from "../base/forms/BaseDateInput.vue";
import BaseDateRange from "../base/forms/BaseDateRange.vue";
import BaseRadio from "../base/forms/BaseRadio.vue";

import { ComponentsMap } from "@/types";
import { isArrayOfArrays } from "@/helpers";

const currentFormId = useId();
const componentsMap: ComponentsMap = {
  BaseTextInput: BaseTextInput,
  BaseTextarea: BaseTextarea,
  BaseSelect: BaseSelect,
  BaseDateInput: BaseDateInput,
  BaseCheckbox: BaseCheckbox,
  BaseDateRange: BaseDateRange,
  BaseRadio: BaseRadio,
};
const emit = defineEmits<{
  formSubmit: [fieldsState?: {}[]];
  onDelete: [formId?: string | number];
  "update:modelValue": [e?: Event];
}>();

const composedForm = ref(null);
const validated = ref(false);

const {
  fields = [],
  data = [],
  mainWrapClass = "",
  formId = null,
  noSubmitBtn = false,
  noDeleteBtn = false,
} = defineProps<DynamicFormProps>();

const { fieldsState, fieldsSet, createStateFields } = useDynamicForm(
  fields,
  formId ?? currentFormId
);

const dynamicComponent = () => {
  const fieldNodes = [];
  for (const field of fieldsSet.value) {
    if (field?.displayByField?.field) {
      const watchOnFieldVal = fieldsState.value[field?.displayByField?.field];
      if (watchOnFieldVal != field?.displayByField?.showValue) continue;
    }
    if ("displayCondition" in field && !field.displayCondition) continue;
    if (field?.isGroup) {
      const nodes = dynamicFieldsRenderer(field.groupFields, []);
      fieldNodes.push(h("div", nodes));
    }
    fieldNodes.push(createComponent(field));
  }
  return h("div", fieldNodes);
};

function dynamicFieldsRenderer(entryFields, nodes = []) {
  const arrayOfArrays = isArrayOfArrays(entryFields);
  if (arrayOfArrays) {
    for (const fieldArr of entryFields) {
      dynamicFieldsRenderer(fieldArr, nodes);
    }
  } else {
    for (const field of entryFields) {
      if ("displayCondition" in field && !field.displayCondition) continue;
      const node = createComponent(field);
      nodes.push(node);
    }
  }
  return nodes;
}

function createComponent(field) {
  if (field?.props?.isHidden) return;
  let stateBlock = fieldsState.value;
  if (field?.stateBlock) {
    stateBlock = field?.stateBlock?.split(".")?.reduce((p, n) => {
      return p[n];
    }, fieldsState.value);
  }

  const component = {
    ...field.props,

    modelValue: stateBlock[field.fieldName],
    "onUpdate:modelValue": (value) => {
      if (field.fieldName) {
        stateBlock[field.fieldName] = value;
        emit("update:modelValue", value);
      }
    },
  };
  if (field.fieldName) {
    component.validated = validated.value;
  }
  if (field.onClick) {
    component.onClick = (e) => {
      field.onClick(fieldsSet.value, fieldsState.value, e);
      createStateFields();
    };
  }
  if (field.refreshFieldState) {
    component.onClick = (e) => {
      createStateFields();
    };
  }
  if (field.onInput) {
    component.onInput = (e) => {
      field.onInput(fieldsSet.value, fieldsState.value, e);
    };
  }

  return h(
    componentsMap[field.component] || field.component,
    { ...component },
    field.innerText
  );
}

function logger() {
  console.log(fieldsState, "logger");
}
function onFormSubmit() {
  validated.value = true;
  nextTick(() => {
    const hasInvalidFields = composedForm.value.querySelector(
      "input[aria-invalid='true']"
    );
    if (!!hasInvalidFields) return;
    emit("formSubmit", fieldsState);
  });
}
function onDelete() {
  emit("onDelete", formId);
}
</script>

<style scoped></style>
