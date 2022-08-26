<script>
// This will work in both `<script setup>` and `<script>`
definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <Header />
    <Suspense>
      <Intro />
    </Suspense>
  </div>
</template>
