<template>
  <div :class="customWrapClass">
    <template v-if="!group"
      ><label>
        <input v-bind="$attrs" v-model="model" :type="type" />

        {{ label }}
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
          />
          {{ checkbox.label }}
        </label>
      </div>
    </template>
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
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
  ariaInvalid = undefined,
  group = false,
  checkboxGroup = [],
} = defineProps<CheckboxProps>();

if (group) {
  model.value = [];
}
</script>

<style scoped></style>
