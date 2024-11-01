<script setup lang="ts">
import type { Community } from "~/types";

const { community } = defineProps<{
  community: Community;
}>();
</script>

<template>
  <div class="card card-side bg-accent shadow-xl">
    <figure>
      <img
        src="https://drgoodprice.com/wp-content/uploads/2024/04/dr-good-comunidad-unida-united-community-1.webp"
        alt="Movie"
        class="h-64"
      />
    </figure>
    <div class="card-body text-accent-content">
      <h2 class="card-title">{{ community.name }}</h2>
      <p class="mb-4 text-gray-600">{{ community.description }}</p>
      <div class="text-xs text-gray-800">
        <p>Creada: {{ community.createdAt }}</p>
      </div>
    </div>
  </div>
</template>
