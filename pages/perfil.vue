<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

definePageMeta({
  requiresAuth: true,
});

const { currentUser } = useAuthStore();
const config = useRuntimeConfig();

const DEFAULT_PIC = config.public.defaultProfilePicture;

const fullName = computed(() => {
  const firstName = currentUser?.firstName ?? "";
  const lastName = currentUser?.lastName ?? "";
  return firstName + " " + lastName;
});
</script>

<template>
  <div>
    <PageTitle class="mb-8">Perfil</PageTitle>
    <div class="flex justify-center">
      <div class="card min-w-[400px] bg-accent text-success-content">
        <div class="card-body flex flex-col items-center">
          <div class="avatar">
            <div class="mask mask-squircle w-24">
              <img :src="currentUser?.profilePic || DEFAULT_PIC" />
            </div>
          </div>

          <div class="card-title">
            {{ fullName }}
          </div>
          <p class="text-sm font-semibold text-base-100">
            {{ currentUser?.email }}
          </p>

          <div class="divider divider-neutral"></div>
          <div>
            <p class="text-sm font-semibold text-base-100">
              Teléfono: {{ currentUser?.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
