<script setup>
defineProps({
  path: String,
})
</script>

<template>
  <div

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
