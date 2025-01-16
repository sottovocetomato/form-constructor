<template>
  <div :class="customWrapClass">
    <label>
      {{ label }}
      <input v-bind="$attrs" v-model="model" :type="type" />
    </label>
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import type { DateInputProps } from "@/types/interfaces/props";
defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

const {
  ariaInvalid = undefined,
  customWrapClass = "",
  label = "",
  type = "date",
} = defineProps<DateInputProps>();
</script>

<style scoped></style>
