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
interface Props {
  type: string;
  name?: string;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
  ariaInvalid?: boolean | null;
  customWrapClass?: string;
  customClass?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
}

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
} = defineProps<Props>();
</script>

<style scoped></style>
