<script setup>
useHead({
  title: 'Home',
})
const route = useRoute()
const token = route.query.token
const passwordChanged = ref(false)
</script>

<template>
  <div>
    <ClientOnly>
      <Header />
      <Intro />
      <div v-if="token">
        <ResetPassword :token="token" @change-success="passwordChanged = true" />
      </div>
      <Dialog message="OK. Password changed" :show="passwordChanged" />
    </ClientOnly>
  </div>
</template>
