<script setup>
defineProps({
  path: String,
})
</script>

<template>
  <div
    p-4
    flex
    justify-between
    items-center
  >
    <Logo />

    <div class="title">
      {{ path }}
    </div>
    <Account />
  </div>
</template>

<style scoped>
.title{
  font-weight: bold;
}
</style>
