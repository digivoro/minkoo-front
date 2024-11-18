<script setup lang="ts">
import { useCommunityStore } from "~/store/communities";

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
    <PageTitle class="mb-8">{{ community.name }}</PageTitle>
    <CommunityCard :community="community" />
  </template>
</template>
