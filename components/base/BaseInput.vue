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
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number,
});
</script>

<style scoped></style>
