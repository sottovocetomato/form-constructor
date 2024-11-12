<template>
  <div :class="customWrapClass">
    <input
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :class="customClass"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :aria-invalid="ariaInvalid"
    />
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import { InputProps } from "@/types/interfaces/props";
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
  placeholder = "Your text",
  id = "",
} = defineProps<InputProps>();
</script>

<style scoped></style>
