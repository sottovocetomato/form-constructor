<template>
  <div :class="customWrapClass">
    <select v-bind="$attrs" v-model="model" :id="selectId">
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
import type { SelectInputProps } from "@/types/interfaces/props";

const selectId = `select-${useId()}`;

defineOptions({
  inheritAttrs: false,
});
const model = defineModel();

const {
  ariaInvalid = undefined,
  customWrapClass = "",
  options = [],
} = defineProps<SelectInputProps>();

watch(
  () => options,
  async (newVal, oldVal) => {
    const selectedOptions = newVal.find((el) => el.selected);
    if (selectedOptions) {
      model.value = selectedOptions?.value;
    }
  },
  { deep: true }
);
</script>

<style scoped></style>
