<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

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
    if (route.query.redirect) {
      return navigateTo("" + route.query.redirect);
    }
    navigateTo("/");
  } catch (err) {
    error.value = "Login inválido";
    console.error(err);
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
  <div class="flex flex-col items-center justify-center">
    <!-- If redirected here -->
    <div v-if="route.query.redirect" class="mt-12 w-96 text-center">
      <p class="mb-4 text-6xl">👻</p>
      <p class="text-2xl font-bold">
        Necesitas iniciar sesión para ingresar a esta página...
      </p>
    </div>

    <!-- Login form -->
    <div class="mt-12 flex items-center">
      <div class="card w-80 bg-secondary shadow-lg">
        <div class="card-body">
          <div class="card-title">
            <h2 class="mb-2 text-secondary-content">Inicia sesión</h2>
          </div>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
            <label
              class="input input-bordered flex items-center gap-2"
              for="email"
            >
              <IconEmail class="size-4 text-neutral" />
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
              <IconUser class="size-4 text-neutral" />
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

      <!-- If redirected: Optional go back -->
      <template v-if="route.query.redirect">
        <div class="divider divider-secondary divider-horizontal">o</div>
        <div class="flex w-80">
          <div class="btn btn-secondary w-32" @click="router.back()">
            <IconBack class="size-4" />
            Volver
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 1rem;
}
</style>
