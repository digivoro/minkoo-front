<template>
  <div>
    <div class="hero min-h-screen">
      <div class="hero-overlay backdrop-brightness-50"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">¡Hola!</h1>
          <p class="mb-10 text-xl">
            En Minkoo trabajamos juntos para construir el futuro que queremos
            ver 💪
          </p>
          <p class="mb-2 text-lg">Empieza por acá:</p>
          <div class="flex justify-center">
            <NuxtLink class="btn btn-primary btn-lg" to="/comunidades">
              Únete a una comunidad
            </NuxtLink>
            <div class="divider divider-primary divider-horizontal">O</div>
            <NuxtLink class="btn btn-primary btn-lg" to="/comunidades/crear">
              Inicia una comunidad
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <p></p>
  </div>
</template>

<style scoped>
.hero {
  background-image: url(https://miro.medium.com/v2/resize:fit:1100/format:webp/1*wwtfSLRQtqEH1Zfbl288KA.png);
  background-size: cover;
  background-position: 0 80%;
}
</style>
