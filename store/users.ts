import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;

  async function joinCommunity(userId: number, communityId: number) {
    const authStore = useAuthStore();
    const Authorization = "Bearer " + authStore.token;
    try {
      const response = await $fetch(API_URL + "/users/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
        body: {
          userId,
          communityId,
        },
      });
      if (!response)
        throw new Error("Ocurrió un error al ingresar a la comunidad");
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Ocurrió un problema al ingresar",
      };
    }
  }

  return {
    joinCommunity,
  };
});
