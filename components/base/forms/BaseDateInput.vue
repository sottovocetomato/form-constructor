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

defineOptions({
  inheritAttrs: false,
});
const emit = defineEmits(["update:modelValue"]);
const { today: currentDay } = useDate();

const {
  ariaInvalid = undefined,
  customWrapClass = "",
  label = "",
  type = "date",
  setToday = false,
} = defineProps<DateInputProps>();

const model = defineModel();

onMounted(() => {
  if (setToday) {
    model.value = currentDay;
  }
});

watch(
  () => setToday,
  (newVal, oldVal) => {
    console.log(newVal, "watching");
    if (!newVal) {
      model.value = "";
    } else {
      model.value = currentDay;
    }
  },
  { deep: true }
);
</script>

<style scoped></style>
