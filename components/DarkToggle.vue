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
      setTimeout(() => { this.theme.global.name = this.currentColor }, 100)
    },
  },
  mounted() {
    if (this.color.value === 'dark') {
      this.currentColor = 'dark'
    }
    else {
      this.color.preference = 'light'
      this.currentColor = 'light'
    }
  },
  methods: {
    toggleDark() {
      this.color.preference = this.color.value === 'dark' ? 'light' : 'dark'
      this.currentColor = this.color.preference
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
