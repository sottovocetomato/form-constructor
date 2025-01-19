<template>
  <div :class="`${customWrapClass} date-range-input`">
    <BaseDateInput
      :label="labelFrom"
      :name="nameFrom || 'dateStart'"
      type="date"
      :max="dateRange?.dateEnd"
      v-model="dateRange.dateStart"
    />
    <BaseDateInput
      :name="nameTo || 'dateEnd'"
      :label="labelTo"
      type="date"
      :min="dateRange?.dateStart"
      v-model="dateRange.dateEnd"
    />
  </div>
</template>

<script setup lang="ts">
import type { DateRangeInputProps } from "@/types/interfaces/props";
import BaseDateInput from "@/components/base/forms/BaseDateInput.vue";

// const dateStart = defineModel("dateStart");
// const dateEnd = defineModel("dateEnd");

const dateRange = defineModel({ default: { dateStart: "", dateEnd: "" } });

const {
  ariaInvalid = undefined,
  customWrapClass = "",
  label = "",
  type = "date",
  setToday = false,
  labelFrom = "",
  labelTo = "",
  nameTo = "",
  nameFrom = "",
  // dateRange = {},
} = defineProps<DateRangeInputProps>();
</script>

<style scoped></style>
