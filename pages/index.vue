<script>
export default {
  head: {
    title: 'Home',
  },
}
</script>

<template>
  <div>
    <ClientOnly>
      <Header />
      <Intro />
    </ClientOnly>
  </div>
</template>
