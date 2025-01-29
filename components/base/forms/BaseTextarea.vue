<template>
  <div :class="customWrapClass">
    <label v-if="label"> {{ label }} <sup v-if="required"> * </sup> </label>

    <textarea
      v-bind="$attrs"
      :class="customClass"
      v-model="model"
      :placeholder="placeholder"
      :aria-invalid="ariaInvalid"
    >
    </textarea>

    <small v-if="ariaInvalid" id="invalid-helper"
      >Field {{ label }} shouldn't be empty</small
    >
  </div>
</template>

<script setup lang="ts">
import type { FormElementProps } from "@/types/interfaces/props";
defineOptions({
  inheritAttrs: false,
});
const model = defineModel<string>();

const {
  customWrapClass = "",
  placeholder = "Textarea",
  customClass = "",
  label = "",
  validated = false,
  required = false,
} = defineProps<FormElementProps>();

const ariaInvalid = computed(
  () => (validated && required && !model.value) || undefined
);
</script>

<style scoped></style>
