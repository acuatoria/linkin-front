<script setup lang="ts">
import { useTheme } from 'vuetify'
const color = useColorMode()
const theme = useTheme()
function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="dark:i-line-md:sun-rising-loop i-line-md:sun-rising-filled-loop" />
  </button>
</template>
