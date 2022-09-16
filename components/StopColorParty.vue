<script setup>
const active = ref(false)
watch(active, (new_value, old_value) => {
  if (!new_value)
    deactivate_colors()
  else
    activate_colors()
})
function toggle() {
  active.value = !active.value
}
</script>

<template>
  <div>
    <button class="!outline-none" title="Color party" :class="active ? 'active' : 'inactive'" @click="toggle">
      <div class="i-line-md:construction-twotone" />
    </button>
  </div>
</template>

<style scoped>
.inactive {
  transform: rotate(180deg);
  transition: transform 0.5s ease-in-out;
}
.active {
  transform: rotate(360deg);
  transition: transform 0.5s ease-in-out;
}
</style>
