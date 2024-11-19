<script setup lang="ts">
import type { Community } from "~/types";

const { community } = defineProps<{
  community: Community;
}>();
</script>

<template>
  <div class="card image-full card-side h-64 bg-neutral shadow-xl">
    <figure class="bg-secondary">
      <img
        src="https://drgoodprice.com/wp-content/uploads/2024/04/dr-good-comunidad-unida-united-community-1.webp"
        :alt="community.name"
      />
    </figure>
    <div class="card-body text-neutral-content">
      <h2 class="card-title">{{ community.name }}</h2>
      <p class="mb-4 text-neutral-content opacity-60">
        {{ community.description }}
      </p>
    </div>
  </div>
</template>
