<template>
  <form
    :class="[mainWrapClass ? mainWrapClass : 'composed-form']"
    @submit.prevent
    v-if="fieldsSet.length"
  >
    <div class="composed-form__content">
      <dynamicComponent />
    </div>
    <div class="form-controls">
      <button
        v-if="!noDeleteBtn"
        type="submit"
        @click="onDelete"
        class="btn-danger"
      >
        Удалить
      </button>
      <button v-if="!noSubmitBtn" type="submit" @click="onFormSubmit">
        Сохранить
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
      // console.log(watchOnFieldVal, "watchOnFieldVal");
      // console.log(
      //   watchOnFieldVal != field?.displayByField?.onTrue,
      //   "watchOnFieldVal != field?.displayByField?.onTrue"
      // );
      if (watchOnFieldVal != field?.displayByField?.showValue) continue;
    }
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
  emit("formSubmit", fieldsState);
}
function onDelete() {
  emit("onDelete", formId);
}
</script>

<style scoped></style>
