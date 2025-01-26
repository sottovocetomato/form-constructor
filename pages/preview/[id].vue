<template>
  <div class="form-preview">
    <DynamicForm
      v-if="formLoaded"
      :fields="currentForm"
      :formId="formId"
      :key="formId"
      noDeleteBtn
      @formSubmit="onFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useFormBuilderState } from "@/.nuxt/imports";

const { getPresavedForm } = useSavedForms();

const route = useRoute();
const currentForm = ref([]);
const formId = computed(() => route?.params?.id);
const formLoaded = ref(false);

onMounted(() => {
  const preSavedForm = getPresavedForm();
  currentForm.value = preSavedForm?.form;
  console.log(currentForm.value, "currentForm.value");
  formLoaded.value = true;
});

function onFormSubmit(state) {
  console.log(state.value, "ON FORM SUBMIT");
}
</script>

<style scoped></style>
