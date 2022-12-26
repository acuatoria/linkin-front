<script setup>
useHead({
  title: 'Pyxilink - Links everywhere',
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  color-scheme: unset !important;
}
html.dark {
  background: #222;
  color: white;
}
</style>
