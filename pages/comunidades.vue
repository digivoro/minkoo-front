<script setup lang="ts">
import { useCommunityStore } from "~/store/communities";

const communityStore = useCommunityStore();
const { communities } = storeToRefs(communityStore);

const isPending = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    await communityStore.getCommunities();
  } catch (err) {
    error.value = "Hubo un error al cargar las comunidades";
    console.error(error);
  } finally {
    isPending.value = false;
  }
});
</script>

<template>
  <div>
    <PageTitle class="mb-8">Comunidades</PageTitle>

    <!-- Loading -->
    <div v-if="isPending" class="text-center">
      <p>Cargando...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>

    <!-- List -->
    <div
      v-else-if="communities.length"
      class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <NuxtLink
        v-for="community in communities"
        :key="community.id"
        :to="`/comunidad/${community.id}`"
        class="transition-all hover:scale-105 hover:cursor-pointer"
      >
        <CommunityCard :community="community" />
      </NuxtLink>
    </div>

    <!-- Empty -->
    <div v-else class="text-center text-gray-500">
      <p>No se encontraron comunidades.</p>
    </div>
  </div>
</template>
