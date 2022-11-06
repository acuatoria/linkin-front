<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const color = useColorMode()

theme.global.name.value = color.preference
if (color.preference === 'system')
  theme.global.name.value = 'dark'

// theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

function toggleDark() {
  color.preference = color.preference === 'dark' ? 'light' : 'dark'
  theme.global.name.value = color.preference
}
</script>

<template>
  <button class="!outline-none" title="Dark mode toggle" @click="toggleDark">
    <div class="dark:i-line-md:sunny-filled i-line-md:moon-filled" />
  </button>
</template>
