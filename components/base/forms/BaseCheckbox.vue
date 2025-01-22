<template>
  <div :class="customWrapClass">
    <label v-if="label">
      <input v-bind="$attrs" v-model="model" :type="type" />

      {{ label }}
    </label>
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxProps } from "@/types/interfaces/props";

defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

const {
  label = "Checkbox",
  type = "checkbox",
  customWrapClass = "",
  ariaInvalid = undefined,
} = defineProps<CheckboxProps>();
</script>

<style scoped></style>
