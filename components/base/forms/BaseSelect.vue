<template>
  <div :class="customWrapClass">
    <select v-bind="$attrs" v-model="model">
      <option
        v-for="option in options"
        :selected="option?.selected"
        :disabled="option?.disabled"
        :value="option?.value"
      >
        {{ option?.text }}
      </option>
    </select>
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
  ariaInvalid = undefined,
  customWrapClass = "",
  options = [],
} = defineProps<FormElementProps>();
</script>

<style scoped></style>
