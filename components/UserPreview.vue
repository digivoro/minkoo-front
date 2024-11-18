<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const config = useRuntimeConfig();
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          :src="
            authStore.currentUser?.profilePic ||
            config.public.defaultProfilePicture
          "
        />
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
    >
      <ClientOnly>
        <li>
          <NuxtLink to="/perfil" class="justify-between"> Perfil </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/salir" class="justify-between"> Salir </NuxtLink>
        </li>
      </ClientOnly>
    </ul>
  </div>
</template>
