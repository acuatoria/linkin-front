<script setup>
useHead({
  title: 'Pyxilink - where links want to be',
  script: [
    {
      src: 'https://polyfill.io/v3/polyfill.min.js?version=3.111.0&features='
      + 'Array.prototype.at%2C'
      + 'MediaQueryList.prototype.addEventListener%2C'
      + 'IntersectionObserver%2C'
      + 'ResizeObserver%2C'
      + 'Object.fromEntries%2C'
      + 'WebAnimations%2C'
      + 'Element.prototype.animate%2C'
      + 'document%2C'
      + 'globalThis',
    },
    {
      async: true,
      src: '//static.getclicky.com/101392052.js',
    },
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
