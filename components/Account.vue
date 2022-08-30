<script setup>
const login = false
</script>

<template>
  <div
    m-5
    flex
    justify-center
    gap-3
  >
    <div class="flex flex-column">
      <div class="bg-white shadow rounded">
        <Login :dialog="login" />
      </div>

      <div class="pa-2 mr-5">
        <a class="decoration-line-through" href="#">Register</a>
      </div>
    </div>
  </div>
</template>
