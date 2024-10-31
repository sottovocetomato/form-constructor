<template>
  <input
    type="text"
    name="firstname"
    placeholder="First name"
    aria-label="First name"
    required
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  foo: string;
  bar?: number;
}>();
</script>

<style scoped></style>
