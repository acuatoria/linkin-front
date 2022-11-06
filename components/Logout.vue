<script setup>
const user = useUserStore()
const router = useRouter()
async function logout() {
  const _ = await logout_user(user.token)
  user.isLogged = false
  user.token = ''
  router.push('/')
}
</script>

<template>
  <v-btn
    @click="logout"
  >
    <v-icon icon="i-line-md:cancel" />
    Sign out
  </v-btn>
</template>
