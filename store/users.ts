import type { JoinedCommunities } from "~/types";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;

  const joinedCommunities = ref<JoinedCommunities[]>([]);

  async function joinCommunity(communityId: number) {
    const authStore = useAuthStore();
    const URL = `${API_URL}/users/join/${communityId}`;
    try {
      const response = await $fetch(URL, {
        method: "POST",
        headers: {
          Authorization: authStore.authHeader,
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

  async function fetchJoinedCommunities() {
    try {
      const authStore = useAuthStore();
      const URL = `${API_URL}/users/joined-communities`;

      const response = await $fetch<JoinedCommunities[]>(URL, {
        method: "GET",
        headers: {
          Authorization: authStore.authHeader,
          "Content-Type": "application/json",
        },
      });
      if (!response) {
        throw new Error("Ocurrió un error al ingresar a la comunidad");
      }
      joinedCommunities.value = response;
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
    joinedCommunities,
    fetchJoinedCommunities,
  };
});
