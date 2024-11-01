<script setup lang="ts">
const navItems = [
  {
    name: "home",
    text: "Inicio",
    link: "/",
    displays: ["drawer"],
  },
  {
    name: "markets",
    text: "Mercados",
    link: "/mercados",
    displays: ["navbar", "drawer"],
  },
  {
    name: "communities",
    text: "Comunidades",
    link: "/comunidades",
    displays: ["navbar", "drawer"],
  },
  {
    name: "profile",
    text: "Mi perfil",
    link: "/perfil",
    displays: ["drawer"],
  },
];

const navbarItems = navItems.filter((i) => i.displays.includes("navbar"));
const drawerItems = navItems.filter((i) => i.displays.includes("drawer"));
</script>

<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar w-full bg-base-300">
        <!-- Mobile -->
        <div class="flex-none lg:hidden">
          <label
            for="my-drawer-3"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <!-- Mobile+LG -->
        <div class="mx-2 flex-1 px-2"><AppLogo /></div>
        <!-- LG -->
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal items-center">
            <!-- Navbar menu content here -->
            <li v-for="(item, i) in navbarItems" :key="i">
              <NuxtLink :to="item.link">
                {{ item.text }}
              </NuxtLink>
            </li>
            <span class="ml-2">
              <UserPreview />
            </span>
          </ul>
        </div>
      </div>

      <!-- PageContent -->
      <slot />
    </div>
    <!-- Drawer -->
    <div class="drawer-side">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>

      <ul class="menu min-h-full w-80 bg-base-200 p-4">
        <AppLogo />
        <NuxtLink to="/perfil">
          <button class="btn btn-ghost flex items-center pl-2">
            <UserPreview class="mr-2" />
            <div>
              <p class="font-bold">User Name</p>
              <p class="text-xs">user@email.com</p>
            </div>
          </button>
        </NuxtLink>
        <div class="divider"></div>
        <!-- Sidebar content here -->
        <li v-for="(item, i) in navItems" :key="i">
          <NuxtLink :to="item.link">{{ item.text }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
