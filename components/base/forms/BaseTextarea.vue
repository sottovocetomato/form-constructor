<template>
  <div :class="customWrapClass">
    <label v-if="label"> {{ label }} </label>

    <textarea
      v-bind="$attrs"
      :class="customClass"
      v-model="model"
      :placeholder="placeholder"
    >
    </textarea>

    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import { FormElementProps } from "@/types/interfaces/props";
defineOptions({
  inheritAttrs: false,
});
const model = defineModel();

const {
  customWrapClass = "",
  placeholder = "Textarea",
  customClass = "",
  label = "",
  ariaInvalid = undefined,
} = defineProps<FormElementProps>();
</script>

<style scoped></style>
