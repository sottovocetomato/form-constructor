<template>
  <DynamicForm mainWrapClass="super-form" :fields="fields" />
</template>

<script setup lang="ts">
const fields = [
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      type: "text",
      placeholder: "firs input placeholder",
    },
  },
];
</script>

<style scoped></style>
