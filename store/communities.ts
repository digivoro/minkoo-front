import type { Community } from "~/types";

export const useCommunityStore = defineStore("community", () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;
  const communities = ref<Community[]>([]);
  const community = ref<Community | null>(null);

  async function getCommunities() {
    try {
      const response: Community[] = await $fetch(API_URL + "/communities", {
        method: "GET",
      });
      communities.value = response;
    } catch (error) {
      communities.value = [];
      throw error;
    }
  }

  async function getCommunity(id: number) {
    try {
      const response: Community = await $fetch(API_URL + "/communities/" + id, {
        method: "GET",
      });
      community.value = response;
    } catch (error) {
      community.value = null;
      throw error;
    }
  }

  return { communities, community, getCommunities, getCommunity };
});
