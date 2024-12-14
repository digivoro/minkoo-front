<script setup lang="ts">
import { useAuthStore } from "./store/auth";

const appTitle = "Minkoo";
useHead({
  title: appTitle,
  titleTemplate: (localTitle) => {
    if (localTitle === appTitle) return appTitle;
    return "Minkoo | " + localTitle;
  },
  meta: [{ charset: "utf-8" }],
  htmlAttrs: {
    lang: "es",
  },
});

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initializeAuth();
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
