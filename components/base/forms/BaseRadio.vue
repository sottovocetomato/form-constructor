<template>
  <div :class="customWrapClass">
    <div class="radio-group" v-for="radio in radioGroup">
      <label>
        <input
          v-model="model"
          type="radio"
          :value="radio.value || radio.label"
          :disabled="radio.disabled"
          :aria-invalid="ariaInvalid"
        />
        {{ radio.label }}<sup v-if="required"> * </sup>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RadioProps } from "@/types/interfaces/props";

defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

const {
  label = "Radio",
  customWrapClass = "",
  name = "",
  group = false,
  validated = false,
  required = false,
  radioGroup = [{ label: "Radio", value: "" }],
} = defineProps<RadioProps>();

if (group) {
  model.value = [];
}
const ariaInvalid = computed(
  () => (validated && required && !model.value) || null
);
</script>

<style scoped></style>
