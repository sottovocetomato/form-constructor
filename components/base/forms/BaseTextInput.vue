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
      v-model="model"
    />
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import { TextInputProps } from "@/types/interfaces/props";

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
  placeholder = "Your text",
  id = "",
} = defineProps<TextInputProps>();

onUpdated(() => {
  console.log(placeholder, "updated");
});
</script>

<style scoped></style>
