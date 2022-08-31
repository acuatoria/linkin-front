<script setup>
// makes vuetify be dark
import { useTheme } from 'vuetify'
const theme = useTheme()
theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

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
