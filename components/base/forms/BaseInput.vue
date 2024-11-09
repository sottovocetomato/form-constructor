<template>
  <input
    :type="type"
    :name="firstname"
    :id="id"
    :placeholder="placeholder"
    :aria-label="ariaLabel"
    :class="customClass"
    :required="required"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string;
  firstname?: string;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
  customClass?: string;
  required?: boolean;
}>();
</script>

<style scoped></style>
