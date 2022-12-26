<script setup>
const items = [
  { text: 'Save and manage your links', icon: 'i-carbon-link', subtext: 'See them in any device and in any browser' },
  { text: 'Comment on links', icon: 'i-carbon-add-comment', subtext: 'Write or see comments on any url' },
  { text: 'Share collections of links, like your wish list', icon: 'i-carbon-share-knowledge', subtext: 'Share a link with links inside' },
  { text: 'Discover amazing sites with button bellow', icon: 'i-carbon-image-search', subtext: '' },
]
</script>

<template>
  <v-card
    class="mx-auto"
    mt-1
    max-width="600"
    tile
  >
    <div text-lg m-3>
      <h1>Manage your bookmarks, discover links, share links and comment them</h1>
    </div>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
    >
      <div class="flex" mb-3>
        <span text-left>
          <h2 text-2xl>
            <v-icon v-if="item.icon" :color="color_return(i + 1)" :icon="item.icon" />
            <span ml-3>{{ item.text }}</span>
          </h2>
          <br><span text-lg text-gray>{{ item.subtext }}</span>
        </span>
      </div>
    </v-list-item>
  </v-card>
  <div mt-5>
    <NuxtLink to="/discover">
      <v-btn
        color="lime"
      >
        Discover here now
      </v-btn>
    </NuxtLink>
  </div>
  <span text-gray text-sm>
    Search is important, but also discover new things.
  </span>
</template>

<style scoped>
h2{
  font-size: ;
}
</style>
