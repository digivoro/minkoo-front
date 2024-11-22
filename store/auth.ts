import type { LoginResponse, User } from "~/types";
import { useUserStore } from "./users";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;
  const currentUser = ref<User | null>(null);
  const token = ref<string | null>(null);

  const authHeader = computed<string>(() => {
    if (!token.value) {
      return "";
    }
    return "Bearer " + token.value;
  });

  async function login(email: string, password: string) {
    try {
      const response = await $fetch<LoginResponse>(API_URL + "/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response) {
        throw new Error("No hubo respuesta.");
      }
      setToken(response.access_token);
      await fetchCurrentUser();

      return {
        success: true,
      };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Ocurrió un problema al ingresar",
      };
    }
  }

  async function logout() {
    try {
      await $fetch(API_URL + "/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuth();
    }
  }

  async function initializeAuth() {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      try {
        const tokenData = JSON.parse(storedToken);
        if (tokenData.expires <= new Date().getTime()) {
          return clearAuth();
        }
        await fetchCurrentUser();

        if (!currentUser.value) {
          return;
        }
      } catch (err) {
        console.error("Token parsing error:", err);
      }
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return;

    try {
      // Get User
      const response = await $fetch<User>(API_URL + "/users/profile", {
        method: "GET",
        headers: {
          Authorization: authHeader.value,
        },
      });
      if (!response) {
        throw new Error("No se pudo recuperar el usuario");
      }
      currentUser.value = response;

      // Get joined communities
      const userStore = useUserStore();
      await userStore.fetchJoinedCommunities();
    } catch (err) {
      console.error("Fetch user error:", err);
      clearAuth();
    }
  }

  function setToken(newToken: string | null) {
    token.value = newToken;
    const tokenData = {
      value: newToken,
      expires: new Date().getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem("auth_token", JSON.stringify(tokenData));
  }

  function clearAuth() {
    token.value = null;
    currentUser.value = null;
    localStorage.removeItem("auth_token");
  }

  return {
    currentUser,
    token,
    login,
    logout,
    initializeAuth,
    authHeader,
  };
});
