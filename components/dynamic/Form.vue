<template>
  <form
    :class="[mainWrapClass ? mainWrapClass : 'composed-form']"
    @submit.prevent
    v-if="fieldsSet?.length"
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
import type { DynamicFormProps } from "@/types/interfaces/props";
import componentsMap from "@/models/components/componentsMap";
import fieldEvents from "@/models/settings/fieldEvents";
import { isArrayOfArrays } from "@/helpers";
import type { FieldsState, Field } from "@/types";
import type { Component, VNodeArrayChildren, VNode } from "@vue/runtime-core";
import type { Ref } from "@vue/reactivity";

const currentFormId = useId();

const emit = defineEmits<{
  formSubmit: [fieldsState: Ref, fieldsSet: Ref];
  onDelete: [formId: string | number | null];
  "update:modelValue": [e: Event];
}>();
const composedForm = ref<HTMLElement | null>(null);
const validated = ref(false);

const {
  fields = [],
  data = [],
  mainWrapClass = "",
  formId = null,
  noSubmitBtn = false,
  noDeleteBtn = false,
  clearOnUnmount = false,
  loadedState = undefined,
} = defineProps<DynamicFormProps>();

const {
  fieldsState,
  fieldsSet,
  createStateFields,
  setStateField,
  clearFieldsSet,
} = useDynamicForm(fields, formId ?? currentFormId, loadedState);

onBeforeUnmount(() => {
  if (clearOnUnmount) {
    clearFieldsSet();
  }
});

const dynamicComponent = () => {
  const fieldNodes = [];
  if (!fieldsSet.value) return;
  for (const field of fieldsSet.value) {
    if (field?.displayByField?.field) {
      const watchOnFieldVal = fieldsState.value[field?.displayByField?.field];
      if (watchOnFieldVal != field?.displayByField?.showValue) continue;
    }
    if ("displayCondition" in field && !field.displayCondition) continue;
    if (field?.isGroup) {
      const nodes = dynamicFieldsRenderer(field.groupFields, []);
      fieldNodes.push(h("div", { ...field.props }, nodes));
    }
    fieldNodes.push(createComponent(field));
  }
  return h("div", fieldNodes as VNodeArrayChildren);
};

function dynamicFieldsRenderer(
  entryFields: Field[][] | Field[] = [],
  nodes: VNode[] = []
) {
  const arrayOfArrays = isArrayOfArrays(entryFields);
  if (arrayOfArrays) {
    for (const fieldArr of entryFields) {
      dynamicFieldsRenderer(fieldArr as Field[], nodes);
    }
  } else {
    for (const field of entryFields as Field[]) {
      let node;
      if ("displayCondition" in field && !field.displayCondition) continue;
      if (field?.groupFields) {
        const nodes = dynamicFieldsRenderer(field.groupFields, []);

        node = h("div", { ...field.props }, nodes);
      } else {
        node = createComponent(field);
      }

      if (node) {
        nodes.push(node);
      }
    }
  }
  // console.log(nodes, "nodes");
  return nodes;
}

function createComponent(field: Field): VNode | void {
  if (!field) return;
  if (field?.props?.isHidden || !field.component) return;
  let stateBlock = fieldsState.value;
  if (field?.stateBlock) {
    stateBlock = field?.stateBlock?.split(".")?.reduce((p, n) => {
      return p[n];
    }, fieldsState.value);
  }

  const component: Record<string, any> = {
    ...field.props,
  };
  if (field.fieldName) {
    // console.log(stateBlock[field.fieldName], "stateBlock[field.fieldName]");
    // console.log(field.fieldName, "field.fieldName");
    // console.log(stateBlock, "stateBlock");
    component.validated = validated.value;
    component.modelValue = stateBlock[field.fieldName];
    component["onUpdate:modelValue"] = (value: any) => {
      stateBlock[field.fieldName!] = value;
      emit("update:modelValue", value);
    };
  }
  if (field?.onClick) {
    const onClickFn = fieldEvents[field?.onClick?.eventName];
    component.onClick = (e: Event) => {
      onClickFn?.({
        fields: fieldsSet.value,
        fieldsState: { state: fieldsState.value, setStateField },
        e,
        ...field?.onClick?.params,
      });
      createStateFields();
    };
  }
  if (field?.refreshFieldState) {
    component.onClick = (e: Event) => {
      createStateFields();
    };
  }
  if (field?.onInput) {
    const onInputFn = fieldEvents[field?.onInput?.eventName];
    component.onInput = (e: Event) => {
      onInputFn?.({
        fields: fieldsSet.value,
        fieldsState: { state: fieldsState.value, setStateField },
        e,
        ...field?.onInput?.params,
      });
      createStateFields();
    };
  }

  return h(
    componentsMap?.[field?.component] || field?.component,
    { ...component },
    field.innerText
  );
}

function onFormSubmit() {
  if (!composedForm.value) return;
  validated.value = true;
  nextTick(() => {
    const hasInvalidFields = composedForm.value?.querySelector(
      "[aria-invalid='true']"
    );
    if (!!hasInvalidFields) return;
    emit("formSubmit", fieldsState, fieldsSet);
  });
}
function onDelete() {
  emit("onDelete", formId);
}
</script>

<style scoped></style>
