<template>
  <DynamicForm mainWrapClass="super-form" :fields="fields" />
</template>

<script setup lang="ts">
const fields = [
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      displayName: "",
      sequenceNumber: 1,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "firs input placeholder",
    },
    editField: "placeholder",
  },
];
</script>

<style scoped></style>
