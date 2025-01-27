<template>
  <div :class="customWrapClass">
    <label v-if="name">{{ name }}</label>
    <div class="radio-group" v-for="(radio, ind) in radioGroup">
      <label :for="`${radio.label}-${ind}`">
        <input
          v-model="model"
          type="radio"
          :ind="`${radio.label}-${ind}`"
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
