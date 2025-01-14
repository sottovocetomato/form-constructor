<template>
  <div class="form-preview">
    <DynamicForm
      v-if="formLoaded"
      :fields="currentForm"
      :formId="formId"
      :key="formId"
    />
  </div>
</template>

<script setup lang="ts">
import { useFormBuilderState } from "@/.nuxt/imports";

const route = useRoute();
const currentForm = ref([]);
const formId = computed(() => route?.params?.id);
const formLoaded = ref(false);

onMounted(() => {
  const savedForm = JSON.parse(localStorage.getItem("savedForm") as string);
  currentForm.value = savedForm[formId?.value];
  console.log(currentForm.value, "currentForm.value");
  formLoaded.value = true;
});
</script>

<style scoped></style>
