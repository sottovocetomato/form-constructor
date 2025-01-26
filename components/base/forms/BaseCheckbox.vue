<template>
  <div :class="customWrapClass">
    <template v-if="!group"
      ><label>
        <input
          v-bind="$attrs"
          v-model="model"
          :type="type"
          :aria-invalid="ariaInvalid"
        />

        {{ label }}<sup v-if="required"> * </sup>
      </label></template
    >
    <template v-else>
      <div class="checkbox-group" v-for="checkbox in checkboxGroup">
        <label>
          <input
            v-model="model"
            :type="type"
            :value="checkbox.label"
            :disabled="checkbox.disabled"
            :aria-invalid="ariaInvalid"
          />
          {{ checkbox.label }}
        </label>
      </div>
    </template>
    <small v-if="ariaInvalid" id="invalid-helper"
      >Field {{ label }} shouldn't be empty</small
    >
  </div>
</template>

<script setup lang="ts">
import type { CheckboxProps } from "@/types/interfaces/props";

defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

const {
  label = "Checkbox",
  type = "checkbox",
  customWrapClass = "",
  name = "",
  validated = false,
  required = false,
  group = false,
  checkboxGroup = [],
} = defineProps<CheckboxProps>();

if (group) {
  model.value = [];
}
const ariaInvalid = computed(
  () => (validated && required && !model.value) || null
);
</script>

<style scoped></style>
