<script setup>
const user = useUserStore()
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
        <Login />
        <Logout />
      </div>

      <div v-if="!user.isLogged" class="pa-2 mr-5">
        <a class="decoration-line-through" href="#">Register</a>
      </div>
    </div>
  </div>
</template>
