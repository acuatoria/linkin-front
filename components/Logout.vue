<script setup>
const user = useUserStore()
const router = useRouter()
async function logout() {
  const logout = await logout_user(user.token)
  if (logout)
    user.isLogged = false
  router.push('/')
}
</script>

<template>
  <v-btn
    v-if="user && user.isLogged"
    @click="logout"
  >
    <v-icon icon="i-line-md:cancel" />
    Sign out
  </v-btn>
</template>
