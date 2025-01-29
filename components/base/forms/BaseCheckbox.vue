<template>
  <div :class="customWrapClass">
    <label v-if="name">{{ name }}</label>
    <template v-if="!group"
      ><label :for="`checkbox-${label}`">
        <input
          :id="`checkbox-${label}`"
          v-bind="$attrs"
          v-model="model"
          :type="type"
          :aria-invalid="ariaInvalid"
        />

        {{ label }}<sup v-if="required"> * </sup>
      </label></template
    >
    <template v-else>
      <div class="checkbox-group" v-for="(checkbox, ind) in checkboxGroup">
        <label :for="`${checkbox.label}-${ind}`">
          <input
            v-model="model"
            :id="`${checkbox.label}-${ind}`"
            :type="type"
            :value="checkbox.label"
            :disabled="checkbox.disabled"
            :aria-invalid="ariaInvalid"
          />
          {{ checkbox.label }}<sup v-if="required"> * </sup>
        </label>
      </div>
    </template>
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
  () => (validated && required && !model.value) || undefined
);
</script>

<style scoped></style>
