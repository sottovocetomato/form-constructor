<template>
  <div :class="`${customWrapClass} date-range`" v-if="dateRangeModel">
    <label>{{ label }}<sup v-if="required"> * </sup> </label>
    <div class="date-range__inputs">
      <BaseDateInput
        :label="labelFrom"
        :name="nameFrom || 'dateStart'"
        type="date"
        :max="dateRangeModel?.dateEnd"
        v-model="dateRangeModel.dateStart"
      />
      <BaseDateInput
        :name="nameTo || 'dateEnd'"
        :label="labelTo"
        type="date"
        :min="dateRangeModel?.dateStart"
        v-model="dateRangeModel.dateEnd"
      />
    </div>
    <small v-if="ariaInvalid" id="invalid-helper"
      >Field {{ label }} shouldn't be empty</small
    >
  </div>
</template>

<script setup lang="ts">
import type { DateRangeInputProps } from "@/types/interfaces/props";
import BaseDateInput from "@/components/base/forms/BaseDateInput.vue";

// const dateStart = defineModel("dateStart");
// const dateEnd = defineModel("dateEnd");

const dateRangeModel = defineModel();

const {
  validated = false,
  required = false,
  customWrapClass = "",
  label = "",
  type = "date",
  setToday = false,
  labelFrom = "",
  labelTo = "",
  nameTo = "dateTo",
  nameFrom = "dateFrom",
  dateRange = {},
} = defineProps<DateRangeInputProps>();

if (dateRange && Object.keys(dateRange)?.length > 0) {
  dateRangeModel.value = dateRange;
} else {
  dateRangeModel.value = { dateStart: "", dateEnd: "" };
}

const ariaInvalid = computed(
  () => (validated && required && !model.value) || null
);
</script>

<style scoped></style>
