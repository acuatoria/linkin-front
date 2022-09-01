<script setup>
const user = useUserStore()
function logout() {
  user.isLogged = false
}
</script>

<template>
  <v-btn
    v-if="user && user.isLogged"
    v-bind="props"
    @click="logout"
  >
    <v-icon icon="i-line-md:cancel" />
    Sign out
  </v-btn>
</template>
