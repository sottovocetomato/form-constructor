<template>
  <div class="form-preview">
    <DynamicForm :fields="fields" />
  </div>
</template>

<script setup lang="ts">
// const fields = [
//   {
//     component: "BaseInput",
//     props: {
//       id: "firstInput",
//       displayName: "",
//       sequenceNumber: 1,
//       isHidden: false,
//       required: false,
//       type: "text",
//       placeholder: "firs input placeholder",
//     },
//     editField: "placeholder",
//   },
// ];
const fields = [
  {
    component: "BaseSelect",
    props: {
      options: [
        {
          text: "Email",
          value: "",
          selected: false,
          hidden: null,
          disabled: true,
        },
        {
          text: "Phone",
          value: "1",
          selected: false,
          hidden: null,
          disabled: false,
        },
      ],
    },
    sequenceNumber: 0,
  },
];
</script>

<style scoped></style>
