<template>
  <main class="py-20 px-10 text-center text-size-lg">
    <slot />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Default Layout]
    </div>
  </main>
</template>

<style>
body{
  max-width: 1024px;
  margin:auto;
}
</style>
