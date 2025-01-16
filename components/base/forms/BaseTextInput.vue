<template>
  <div :class="customWrapClass">
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        :placeholder="placeholder"
        :class="customClass"
        :aria-invalid="ariaInvalid"
        :type="number ? 'number' : 'text'"
        v-model="model"
        :id="inputId"
      />
    </label>
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
  label = "",
  number = false,
  placeholder = "Text Input",
  customClass = "",
  ariaInvalid = undefined,
} = defineProps<FormElementProps>();

// onUpdated(() => {
//   console.log(placeholder, "updated");
// });
</script>

<style scoped></style>
