<template>
  <div :class="customWrapClass">
    <label v-if="label"> {{ label }}<sup v-if="required"> * </sup> </label>

    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      :class="customClass"
      :aria-invalid="ariaInvalid"
      :required="required"
      :type="number ? 'number' : 'text'"
      v-model="model"
      :id="inputId"
    />
    <small v-if="ariaInvalid" id="invalid-helper"
      >Field {{ label }} shouldn't be empty</small
    >
  </div>
</template>

<script setup lang="ts">
import { FormElementProps } from "@/types/interfaces/props";
defineOptions({
  inheritAttrs: false,
});
const inputId = `input-${useId()}`;

const model = defineModel();
const {
  customWrapClass = "",
  label = "",
  number = false,
  placeholder = "Text Input",
  customClass = "",
  required = false,
  validated = false,
} = defineProps<FormElementProps>();

const ariaInvalid = computed(
  () => (validated && required && !model.value) || null
);
// onUpdated(() => {
//   console.log(placeholder, "updated");
// });
</script>

<style scoped></style>
