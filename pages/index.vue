<script setup>
useHead({
  title: 'Home',
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
