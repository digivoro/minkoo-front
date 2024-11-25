<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { useCommunityStore } from "~/store/communities";
import { useUserStore } from "~/store/users";

definePageMeta({
  layout: "community",
  requiresAuth: true,
});

const config = useRuntimeConfig();
const route = useRoute();
const userStore = useUserStore();
const authStore = useAuthStore();
const communityStore = useCommunityStore();
const { community } = storeToRefs(communityStore);

const isPending = ref(true);
const error = ref<string | null>(null);

const userIsMember = computed(() =>
  userStore.joinedCommunities.find(
    (c) => community.value?.id === c.communityId,
  ),
);
const totalMembersText = computed(() => {
  const membersCount = community.value?.members.total;
  return `${membersCount} miembro${membersCount != 1 ? "s" : ""}`;
});

// Tabs
const activeTab = ref(0);
function setActiveTab(tabIndex: number) {
  activeTab.value = tabIndex;
}

async function onJoinCommunity() {
  try {
    error.value = null;
    if (!authStore.currentUser) {
      throw new Error("Usuario no autenticado");
    }
    if (!community.value?.id) {
      throw new Error("Identificación de comunidad inválida");
    }
    const response = await userStore.joinCommunity(community.value?.id);
    if (!response.success) {
      throw new Error("No logramos unirte a la comunidad. Intenta más tarde");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
      return;
    }
    error.value = String(err);
  }
}

async function onLeaveCommunity() {
  console.log("Leaving!");
}

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
    <div class="mt-12 flex min-h-screen flex-col items-center">
      <div class="card bg-error">
        <div class="card-body">
          <PageTitle>¡Oops!</PageTitle>
          <p>{{ error }}</p>
          <NuxtLink to="/" class="btn btn-outline btn-neutral">
            Volver al inicio
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>

  <!-- Display -->
  <template v-else-if="community">
    <!-- Hero -->
    <div class="hero relative mb-8 h-60">
      <figure
        class="hero-overlay bg-gradient-to-r from-black via-transparent opacity-70"
      ></figure>

      <div class="absolute left-0 top-0 w-full pl-6 pt-4">
        <div class="text-xs font-bold text-neutral-content">COMUNIDAD</div>
        <p class="mb-8 text-4xl text-neutral-content">
          {{ community.name }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-3 items-start gap-4 px-6">
      <!-- Info card -->
      <div class="card bg-neutral shadow-lg">
        <div class="card-body text-neutral-content">
          <p class="card-title text-xs uppercase">Información</p>
          <p>
            {{ community.description }}
          </p>

          <div class="divider divider-secondary"></div>
          <div class="card-actions">
            <!-- Join/leave -->

            <div class="flex">
              <button
                v-if="userIsMember"
                class="btn btn-primary btn-sm"
                @click="onLeaveCommunity"
              >
                <IconExit class="size-4" />
                <span>Abandonar</span>
              </button>
              <button
                v-else
                class="btn btn-primary btn-sm"
                @click="onJoinCommunity"
              >
                <IconUserGroup class="size-4" />
                <span>Unirte</span>
              </button>
            </div>
            <div class="flex w-full justify-between">
              <div class="flex items-center">
                <IconLockOpen class="mr-2 size-4" />
                <p class="font-semibold">Comunidad abierta</p>
              </div>
            </div>

            <!-- Members preview -->
            <div class="flex w-full">
              <div
                class="avatar"
                v-for="member in community.members.featured"
                :key="member.userId"
              >
                <div class="size-6 rounded-full">
                  <img
                    alt="Member profile picture"
                    :src="
                      member.user.profilePic ||
                      config.public.defaultProfilePicture
                    "
                  />
                </div>
              </div>
            </div>

            <!-- Members Count -->
            <div class="flex w-full">
              <p class="text-xs font-semibold">
                {{ totalMembersText }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="col-span-2">
        <div role="tablist" class="tabs tabs-lifted">
          <!-- Tab: Principal -->
          <input
            type="radio"
            name="community_tabs"
            role="tab"
            class="tab text-xs font-bold uppercase"
            :class="{
              'underline decoration-primary decoration-[1.5px] underline-offset-8':
                activeTab === 0,
            }"
            :checked="activeTab === 0"
            aria-label="Principal"
            @click="setActiveTab(0)"
          />
          <div role="tabpanel" class="tab-content border-base-300 px-4 py-10">
            CONTENIDO PRINCIPAL
          </div>

          <!-- Tab: Miembros -->
          <input
            type="radio"
            name="community_tabs"
            role="tab"
            class="tab text-xs font-bold uppercase"
            :class="{
              'underline decoration-primary decoration-[1.5px] underline-offset-8':
                activeTab === 1,
            }"
            :checked="activeTab === 1"
            aria-label="Miembros"
            @click="setActiveTab(1)"
          />
          <div role="tabpanel" class="tab-content border-base-300 px-4 py-10">
            CONTENIDO MIEMBROS
          </div>

          <!-- Tab: Mercado -->
          <input
            type="radio"
            name="community_tabs"
            role="tab"
            class="tab text-xs font-bold uppercase"
            :class="{
              'underline decoration-primary decoration-[1.5px] underline-offset-8':
                activeTab === 2,
            }"
            :checked="activeTab === 2"
            aria-label="Mercado"
            @click="setActiveTab(2)"
          />
          <div role="tabpanel" class="tab-content border-base-300 px-4 py-10">
            CONTENIDO MERCADO
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
.hero {
  background-image: url("https://drgoodprice.com/wp-content/uploads/2024/04/dr-good-comunidad-unida-united-community-1.webp");
  background-size: cover;
}
</style>
