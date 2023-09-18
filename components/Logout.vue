<template>
  <v-btn
    variant="tonal"
    @click="$auth.logout()"
  >
    <v-icon mr-3 icon="i-line-md:cancel" />
    Sign out
  </v-btn>
</template>
