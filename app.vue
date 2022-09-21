<script setup>
// makes vuetify be dark
import { useTheme } from 'vuetify'
const theme = useTheme()
const color = useColorMode()
theme.global.name.value = color.preference

useHead({
  title: 'Linkin',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  font-family: Roboto;
}

html.dark {
  background: #222;
  color: white;
}
</style>
