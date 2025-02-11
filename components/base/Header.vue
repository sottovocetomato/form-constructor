<template>
  <header class="container-fluid">
    <nuxt-link v-if="!isSavedFormPage" to="/saved-forms">My forms</nuxt-link>
    <nuxt-link v-else to="/">Main Page</nuxt-link>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const isSavedFormPage = computed(() => route.name === "saved-forms");
</script>

<style scoped></style>
