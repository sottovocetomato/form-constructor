<template>
  <div class="form-preview">
    <DynamicForm
      v-if="formLoaded"
      :fields="currentForm"
      :formId="formId"
      noDeleteBtn
      clearOnUnmount
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
  const preSavedForm = getPresavedForm();
  currentForm.value = preSavedForm?.form;
  formLoaded.value = true;
});

function onFormSubmit(state: FieldsState) {
  console.log(state.value, "ON FORM SUBMIT");
  alert("Form is validated and submitted!");
}
</script>

<style scoped></style>
