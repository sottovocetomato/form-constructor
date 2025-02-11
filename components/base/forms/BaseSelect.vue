<template>
  <div :class="customWrapClass">
    <label v-if="label"> {{ label }}<sup v-if="required"> * </sup> </label>

    <select
      v-bind="$attrs"
      :id="selectId"
      v-model="model"
      :aria-invalid="ariaInvalid"
    >
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
    <small v-if="ariaInvalid" id="invalid-helper"
      >Field {{ label }} shouldn't be empty</small
    >
  </div>
</template>

<script setup lang="ts">
import type { SelectInputProps } from "@/types/interfaces/props";

const selectId = `select-${useId()}`;

defineOptions({
  inheritAttrs: false,
});

const {
  customWrapClass = "",
  label = "",
  options = [],
  validated = false,
  required = false,
} = defineProps<SelectInputProps>();

const model = defineModel({ default: "" });
const ariaInvalid = computed(
  () => (validated && required && !model.value) || undefined
);
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
