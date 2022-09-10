<script>
export default {
  head: {
    title: 'Home',
  },
}
definePageMeta({
  middleware: ['redirect'],
})
</script>

<template>
  <div>
    <Header />

    <Intro />
  </div>
</template>
