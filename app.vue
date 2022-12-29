<script setup>
useHead({
  title: 'Pyxilink - Links everywhere',
  script: [
    {
      src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,ResizeObserver,WebAnimations,Object.fromEntries,Array.prototype.at',
    },
    {
      async: true,
      src: '//static.getclicky.com/101392052.js',
    }
  ],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <ClientOnly>
    <noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101392052ns.gif" /></p></noscript>
  </ClientOnly>
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
