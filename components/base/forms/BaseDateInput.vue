<template>
  <div :class="customWrapClass">
    <label>
      {{ label }}
      <input v-bind="$attrs" v-model="model" :type="type" />
    </label>
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
import type { DateInputProps } from "@/types/interfaces/props";
import { useDate } from "@/composables/useDate";
defineOptions({
  inheritAttrs: false,
});

const { today: currentDay } = useDate();

const {
  ariaInvalid = undefined,
  customWrapClass = "",
  label = "",
  type = "date",
  today = true,
} = defineProps<DateInputProps>();

const model = defineModel();

onMounted(() => {
  model.value = currentDay;
});

watch(
  () => today,
  async (newVal, oldVal) => {
    console.log(newVal, "newVal");
    model.value = newVal;
  },
  { immediate: false }
);
</script>

<style scoped></style>
