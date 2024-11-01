import type { Community } from "~/types";

export const useCommunitiesStore = defineStore("communities", () => {
  const communities = ref<Community[]>([]);

  async function getCommunities() {
    try {
      const response: Community[] = await $fetch(
        "http://localhost:3001/communities",
        {
          method: "GET",
        },
      );
      communities.value = response;
    } catch (error) {
      communities.value = [];
      throw error;
    }
  }

  return { communities, getCommunities };
});
