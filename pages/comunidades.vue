<script setup lang="ts">
import { useCommunitiesStore } from "~/store/communities";

const communitiesStore = useCommunitiesStore();
const { communities } = storeToRefs(communitiesStore);

const isPending = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    await communitiesStore.getCommunities();
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
      <CommunityCard
        v-for="community in communities"
        :key="community.id"
        :community="community"
      />
    </div>

    <!-- Empty -->
    <div v-else class="text-center text-gray-500">
      <p>No se encontraron comunidades.</p>
    </div>
  </div>
</template>
