<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.logout();
  navigateTo("/");
});
</script>

<template></template>
