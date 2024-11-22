import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.currentUser) {
    return navigateTo("/ingresar");
  }
});
