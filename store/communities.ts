import type { Community } from "~/types";

export const useCommunityStore = defineStore("community", () => {
  const API_URL = "http://localhost:3001/communities";
  const communities = ref<Community[]>([]);
  const community = ref<Community | null>(null);

  async function getCommunities() {
    try {
      const response: Community[] = await $fetch(API_URL, {
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
      const response: Community = await $fetch(API_URL + "/" + id, {
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
