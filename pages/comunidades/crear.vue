<script setup lang="ts">
import type { LngLatLike, MapOptions } from "mapbox-gl";
import { useGeolocation } from "@vueuse/core";
import "mapbox-gl/dist/mapbox-gl.css";

useHead({
  title: "Crear Comunidad",
});

const { coords } = useGeolocation();

const DEFAULT_COORDS = {
  longitude: -70.645,
  latitude: -33.44,
};

const mapOptions = ref<Pick<MapOptions, "center">>({
  center: [DEFAULT_COORDS.longitude, DEFAULT_COORDS.latitude],
});

function onUpdateCenter(evt: LngLatLike) {
  mapOptions.value.center = evt;
}

watch(coords, (val, newVal) => {
  if (
    !newVal.latitude ||
    !newVal.longitude ||
    newVal.latitude === Infinity ||
    newVal.longitude === Infinity
  ) {
    return;
  }
  mapOptions.value.center = [newVal.longitude, newVal.latitude];
});
</script>

<template>
  <div class="p-6">
    <PageTitle class="mb-8">Crear comunidad</PageTitle>
    <AppMap class="" :options="mapOptions" @update-center="onUpdateCenter" />
    <div>MAPA</div>
  </div>
</template>
