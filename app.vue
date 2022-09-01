<script setup>
// makes vuetify be dark
import { useTheme } from 'vuetify'
const theme = useTheme()
const color = useColorMode()
theme.global.name.value = color.preference

useHead({
  title: 'Linkin',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: Roboto;
}

html.dark {
  background: #222;
  color: white;
}
</style>
