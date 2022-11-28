<script>
import { useTheme } from 'vuetify'
export default {
  props: ['message', 'show'],
  data() {
    return {
      theme: useTheme(),
      color: useColorMode(),
      currentColor: '',
    }
  },
  watch: {
    currentColor() {
      setTimeout(() => { this.theme.global.name = this.currentColor }, 200)
      setTimeout(() => { this.color.preference = this.currentColor }, 100)
    },
  },
  mounted() {
    if (this.color.value === 'dark') {
      this.currentColor = 'dark'
    }
    else {
      this.currentColor = 'light'
    }
  },
  methods: {
    toggleDark() {
      this.currentColor = this.currentColor === 'dark' ? 'light' : 'dark'
    },
  },
}
</script>

<template>
  <button class="!outline-none" title="Dark mode toggle" @click="toggleDark">
    <v-icon v-if="color.value === 'dark'" icon="i-line-md:sunny-filled" />
    <v-icon v-else icon="i-line-md:moon-filled" />
  </button>
</template>
