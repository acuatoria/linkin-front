<script>
import { useTheme } from 'vuetify'

export default {
  setup() {
    const theme = useTheme()
    const color = useColorMode()

    return {
      theme,
      color,
      toggleTheme: () => {
        color.preference = theme.global.name.value === 'light' ? 'dark' : 'light'
        theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
      },
    }
  },
  mounted() {
    this.theme.global.name.value = useColorMode().value === 'dark' ? 'dark' : 'light'
  },

}
</script>

<template>
  <client-only>
    <button class="!outline-none" title="Dark mode toggle" @click="toggleTheme">
      <v-icon v-if="theme.global.name.value === 'dark'" icon="i-line-md:sunny-filled" />
      <v-icon v-else icon="i-line-md:moon-filled" />
    </button>
  </client-only>
</template>
