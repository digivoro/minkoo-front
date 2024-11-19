<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});
const isPending = ref(false);
const error = ref<string | null>(null);

async function handleSubmit() {
  try {
    isPending.value = true;
    error.value = null;
    await authStore.login(form.email, form.password);
    // Redirect after successful login
    navigateTo("/");
  } catch (err) {
    error.value = "Login inválido";
    console.log(err);
  } finally {
    isPending.value = false;
  }
}

onMounted(() => {
  if (!!authStore.currentUser) {
    navigateTo("/perfil");
  }
});
</script>

<template>
  <div class="-mt-8 flex h-full items-center justify-center">
    <div class="card max-w-96 bg-accent shadow-lg">
      <div class="card-body">
        <div class="card-title">
          <PageTitle class="mb-8 text-accent-content">Inicia sesión</PageTitle>
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
          <label
            class="input input-bordered flex items-center gap-2"
            for="email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 text-slate-50 opacity-60"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              class="grow"
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="Email"
            />
          </label>

          <label
            class="input input-bordered flex items-center gap-2"
            for="password"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 text-slate-50 opacity-60"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              class="grow text-white"
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="Password"
            />
          </label>

          <button class="btn" type="submit">Login</button>

          <p v-if="error" class="error">
            {{ error }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 1rem;
}
</style>
