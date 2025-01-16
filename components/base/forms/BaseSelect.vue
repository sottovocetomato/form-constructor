<template>
  <div :class="customWrapClass">
    <label>
      {{ label }}
      <select v-bind="$attrs" :id="selectId" v-model="model">
        <option
          v-for="option in options"
          :selected="option?.selected"
          :disabled="option?.disabled"
          :hidden="option?.hidden"
          :value="option?.value"
        >
          {{ option?.text }}
        </option>
      </select>
    </label>
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import type { SelectInputProps } from "@/types/interfaces/props";

const selectId = `select-${useId()}`;

defineOptions({
  inheritAttrs: false,
});

const {
  ariaInvalid = undefined,
  customWrapClass = "",
  label = "",
  options = [],
} = defineProps<SelectInputProps>();

const model = defineModel({ default: "" });

// watch(
//   () => options,
//   async (newVal, oldVal) => {
//     console.log(newVal, "newVal");
//     const selectedOptions = newVal.find((el) => el.selected);
//     if (selectedOptions) {
//       model.value = selectedOptions?.value;
//     }
//   },
//   { deep: true, immediate: false }
// );
</script>

<style scoped></style>
