<template>
  <div :class="customWrapClass">
    <input
      :id="id"
      :type="type"
      :name="name"
      :aria-label="ariaLabel"
      v-model="model"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :class="customClass"
    />
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import { DateInputProps } from "@/types/interfaces/props";

const model = defineModel();

const {
  type = "text",
  name = "input",
  ariaLabel = "Text Input",
  required = true,
  readonly = false,
  disabled = false,
  ariaInvalid = null,
  customWrapClass = "",
  customClass = "",
  id = "",
} = defineProps<DateInputProps>();
</script>

<style scoped></style>
