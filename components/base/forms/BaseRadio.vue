<template>
  <div :class="customWrapClass">
    <div class="radio-group" v-for="radio in radioGroup">
      <label>
        <input
          v-model="model"
          type="radio"
          :value="radio.value || radio.label"
          :disabled="radio.disabled"
        />
        {{ radio.label }}
      </label>
    </div>
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
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
  ariaInvalid = undefined,
  group = false,
  radioGroup = [{ label: "Radio", value: "" }],
} = defineProps<RadioProps>();

if (group) {
  model.value = [];
}
</script>

<style scoped></style>
