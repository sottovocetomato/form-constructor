<template>
  <div :class="customWrapClass">
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
  ariaInvalid = undefined,
} = defineProps<FormElementProps>();
</script>

<style scoped></style>
