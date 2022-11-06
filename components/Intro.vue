<script setup>
const items = [
  { text: 'Manage here your links', icon: 'i-carbon-link' },
  { text: 'Discover new links', icon: 'i-carbon-image-search', page: 'discover' },
  { text: 'Share links collections', icon: 'i-carbon-share-knowledge' },
  { text: 'Comments on links', icon: 'i-carbon-add-comment' },
]
const color_changing = ref(0)
const myPolling = setInterval(async () => {
  color_changing.value++
}, 200)

onBeforeUnmount(() => {
  window.clearInterval(myPolling)
})
</script>

<template>
  <v-card
    class="mx-auto"
    mt-8
    max-width="600"
    tile
  >
    <div text-2xl m-3 mb-10>
      Searching is important but also discovering
    </div>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
    >
      <div class="flex">
        <span text-left text-xl m-3>
          <a @click="$router.push(`/${item.page}`)">
            <v-icon v-if="item.icon" :color="color_return(i + 1)" :icon="item.icon" />
            <span ml-3>{{ item.text }}</span>
            <hr v-if="item.page" :style="`border-color:${color_return(color_changing * 2)}`">
          </a>
        </span>
      </div>
    </v-list-item>
  </v-card>
</template>
