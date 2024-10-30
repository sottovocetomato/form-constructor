<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtRouteAnnouncer />
      <NuxtErrorBoundary @error="someErrorLogger">
        <template #error="{ error }">
          <p>An error occurred: {{ error }}</p>
        </template>
        <NuxtPage :key="$route.fullPath" />
      </NuxtErrorBoundary>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
function someErrorLogger(error): void {
  console.error(error, "Some error has occured on app level");
}
</script>
