<script setup lang="ts">
import { useCommunityStore } from "~/store/communities";

definePageMeta({
  layout: "community",
});

const route = useRoute();
const communityStore = useCommunityStore();
const { community } = storeToRefs(communityStore);

const isPending = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    error.value = null;
    await communityStore.getCommunity(+route.params.id);
  } catch (err) {
    error.value = "Hubo un error al cargar la comunidad " + route.params.id;
    console.error(err);
  } finally {
    isPending.value = false;
  }
});
</script>

<template>
  <!-- Loading -->
  <template v-if="isPending">
    <PageTitle>Comunidad</PageTitle>
    <p>Cargando...</p>
  </template>

  <!-- Error -->
  <template v-else-if="error">
    <PageTitle>Oops</PageTitle>
    <p>Se produjo un error al cargar la comunidad</p>
  </template>

  <!-- Display -->
  <template v-else-if="community">
    <!-- Hero -->
    <div class="hero relative mb-8 h-60">
      <figure
        class="hero-overlay bg-gradient-to-r from-black via-transparent opacity-70"
      ></figure>

      <div class="absolute left-0 top-0 w-full pl-4 pt-4">
        <div class="text-xs font-bold text-neutral-content">COMUNIDAD</div>
        <p class="mb-8 text-4xl text-neutral-content">
          {{ community.name }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-3 px-4">
      <div class="card bg-neutral shadow-lg">
        <div class="card-body text-neutral-content">
          <p class="card-title text-sm">Información</p>
          <p>
            {{ community.description }}
          </p>
          <div class="divider divider-secondary"></div>
          <div class="card-actions">
            <div class="flex w-full justify-between">
              <div class="flex items-center">
                <IconLockOpen class="mr-2 size-4" />
                <p class="font-semibold">Comunidad abierta</p>
              </div>
              <button class="btn btn-primary btn-sm">
                <IconUserGroup class="size-4" /> Unirte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
.hero {
  background-image: url("https://drgoodprice.com/wp-content/uploads/2024/04/dr-good-comunidad-unida-united-community-1.webp");
  background-size: cover;
}
</style>
