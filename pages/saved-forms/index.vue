<template>
  <div class="container saved-forms">
    <div class="saved-forms-grid">
      <nuxt-link
        v-for="form in savedForms"
        :to="`/edit/${form.id}`"
        class="saved-form-card"
      >
        <article class="truncate">
          <span>{{ form.name }}</span>
        </article>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getSavedForms } = useSavedForms();
const savedForms = ref();
onMounted(() => {
  savedForms.value = getSavedForms();
});
</script>

<style scoped></style>
