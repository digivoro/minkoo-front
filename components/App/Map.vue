<script setup lang="ts">
import mapboxgl, {
  Map,
  Marker,
  type IControl,
  type LngLatLike,
  type MapOptions,
} from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const props = defineProps<{
  options: Pick<MapOptions, "center">;
}>();
const emits = defineEmits(["update-center"]);
const config = useRuntimeConfig();

mapboxgl.accessToken = config.public.mapboxToken;
const mapContainer = useTemplateRef<HTMLDivElement>("map-container");
const map = ref<Map | null>(null);

function createMap() {
  if (!mapContainer.value) return null;

  return new Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/streets-v12",
    center: props.options.center,
    zoom: 12,
  });
}
function addGeocoder() {
  const geocoder = new MapboxGeocoder({
    accessToken: config.public.mapboxToken,
    mapboxgl,
    marker: true,
  });
  map.value?.addControl(geocoder);
  geocoder.on("result", (e) => {
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: "#D80739",
    })
      .setLngLat(e.result.center)
      .addTo(map.value);

    emits("update-center", e.result.center);
    marker.on("dragend", (e) => {
      if (!map.value) return;
      map.value.easeTo({ center: e.target.getLngLat() });
    });
  });
}

onMounted(() => {
  if (!props.options.center) return null;

  map.value = createMap();
  addGeocoder();
});

onUnmounted(() => {
  map.value?.remove();
  map.value = null;
});

watch(
  () => props.options.center,
  (val, newVal) => {
    if (!map.value || !newVal) return;
  },
);
</script>

<template>
  <div>
    <div ref="map-container" class="mb-12 flex h-96 flex-1"></div>
  </div>
</template>
