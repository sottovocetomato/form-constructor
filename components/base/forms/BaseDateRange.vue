<template>
  <div :class="customWrapClass">
    <BaseDateRange
      :label="labelFrom"
      :name="nameFrom || 'dateStart'"
      type="date"
      :max="dateEnd"
      v-model="dateStart"
    />
    <BaseDateRange
      :name="nameTo || 'dateEnd'"
      :label="labelTo"
      type="date"
      :min="dateStart"
      v-model="dateEnd"
    />
  </div>
</template>

<script setup lang="ts">
import type { DateRangeInputProps } from "@/types/interfaces/props";

const dateStart = defineModel("dateStart");
const dateEnd = defineModel("dateEnd");

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
} = defineProps<DateRangeInputProps>();
</script>

<style scoped></style>
