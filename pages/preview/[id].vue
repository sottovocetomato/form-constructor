<template>
  <div class="form-preview">
    <DynamicForm
      v-if="formLoaded"
      :fields="currentForm"
      :formId="formId"
      noDeleteBtn
      @formSubmit="onFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useFormBuilderState } from "@/.nuxt/imports";
import type { FieldsState } from "@/types";

const { getPresavedForm } = useSavedForms();

const route = useRoute();
const currentForm = ref([]);
const formId = computed(() => `${route?.params?.id}`);
const formLoaded = ref(false);

onMounted(() => {
  console.log("mounted");
  const preSavedForm = getPresavedForm();
  currentForm.value = preSavedForm?.form;
  console.log(currentForm.value, "currentForm.value");
  formLoaded.value = true;
});

function onFormSubmit(state: FieldsState) {
  console.log(state.value, "ON FORM SUBMIT");
}
</script>

<style scoped></style>
