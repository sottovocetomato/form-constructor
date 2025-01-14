<template>
  <div :class="customWrapClass">
    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      :class="customClass"
      :aria-invalid="ariaInvalid"
      v-model="model"
      :id="inputId"
    />
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
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
  placeholder = "Text Input",
  customClass = "",
  ariaInvalid = undefined,
} = defineProps<FormElementProps>();

// onUpdated(() => {
//   console.log(placeholder, "updated");
// });
</script>

<style scoped></style>
