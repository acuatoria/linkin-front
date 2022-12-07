<script>
export default {
  head: {
    title: 'Home PRE',
  },
}
</script>

<template>
  <div>
    <ClientOnly>
      <Header />
      <Register />
      <Intro />
    </ClientOnly>
  </div>
</template>
