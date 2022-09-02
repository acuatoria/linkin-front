<script setup>
const user = useUserStore()
const router = useRouter()
function logout() {
  user.isLogged = false
  router.push('/')
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
