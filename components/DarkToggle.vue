<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const color = useColorMode()

theme.global.name.value = color.preference
if (color.preference === 'system') {
  color.preference = 'light'
  theme.global.name.value = 'light'
}

function toggleDark() {
  color.preference = color.preference === 'dark' ? 'light' : 'dark'
  theme.global.name.value = color.preference
}
</script>

<template>
  <button class="!outline-none" title="Dark mode toggle" @click="toggleDark">
    <v-icon v-if="color.preference === 'dark'" icon="i-line-md:sunny-filled" />
    <v-icon v-else icon="i-line-md:moon-filled" />
  </button>
</template>
