<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const color = useColorMode()
function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
  theme.global.name.value = color.preference
}
</script>

<template>
  <button class="!outline-none" title="Dark mode toggle" @click="toggleDark">
    <div class="dark:i-line-md:sun-rising-loop i-line-md:sun-rising-filled-loop" />
  </button>
</template>
