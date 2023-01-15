<script setup>
useHead({
  title: 'Pyxilink, where links want to be',
  meta: [{
    name: 'description',
    content: 'Here you can manage your bookmarks, share your links as collections, comment on urls and discover interesting things',
  }],
})
const route = useRoute()
const token = route.query.token
const passwordChanged = ref(false)
</script>

<template>
  <div>
    <Header />
    <Intro />
    <div v-if="token">
      <ResetPassword :token="token" @change-success="passwordChanged = true" />
    </div>
    <Dialog message="OK. Password changed" :show="passwordChanged" />
  </div>
</template>
