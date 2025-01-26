<template>
  <div :class="customWrapClass">
    <label> {{ label }}<sup v-if="required"> * </sup> </label>
    <input
      v-bind="$attrs"
      v-model="model"
      :type="type"
      :aria-invalid="ariaInvalid"
    />

    <small v-if="ariaInvalid" id="invalid-helper"
      >Field {{ label }} shouldn't be empty</small
    >
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
  validated = false,
  required = false,
  customWrapClass = "",
  label = "",
  type = "date",
  setToday = false,
} = defineProps<DateInputProps>();

const model = defineModel();

const ariaInvalid = computed(
  () => (validated && required && !model.value) || null
);

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
