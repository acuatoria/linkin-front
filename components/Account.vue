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
      <div class="shadow rounded">
        <div v-if="!user || !user.isLogged">
          <Login />
        </div>
        <div v-if="user && user.isLogged" class="flex flex-column">
          <Logout />
          <Navegation />
        </div>
      </div>
    </div>
  </div>
</template>
