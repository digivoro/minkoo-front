import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.currentUser && to.meta.requiresAuth) {
    return navigateTo("/ingresar");
  }
});
