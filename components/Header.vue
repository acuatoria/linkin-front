<script setup>
defineProps({
  path: String,
})
</script>

<template>
  <div
    p-5
    flex
    justify-between
    items-center
  >
    <Logo />
    <div>
      {{ path }}
    </div>
    <Account />
  </div>
</template>
