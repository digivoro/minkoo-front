<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const config = useRuntimeConfig();

mapboxgl.accessToken = config.public.mapboxToken;

let map;

const mapContainer = useTemplateRef<HTMLDivElement>("map-container");
onMounted(() => {
  if (mapContainer.value) {
    console.log("C");
    const mapbox = new mapboxgl.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-71.224518, 42.213995],
      zoom: 9,
    });

    map = mapbox;
  }
});

onUnmounted(() => {});
</script>

<template>
  <div class="flex" ref="map-container"></div>
</template>
