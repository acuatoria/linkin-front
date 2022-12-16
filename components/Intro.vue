<script setup>
const items = [
  { text: 'Save and manage your links', icon: 'i-carbon-link', subtext: 'Want to see them in any device and in any browser, this is for you.' },
  { text: 'Comment on links', icon: 'i-carbon-add-comment', subtext: 'Write or see comments on any url, this is for you.' },
  { text: 'Share collections of links, like your wish list', icon: 'i-carbon-share-knowledge', subtext: 'Share a link with links inside, this is for you.' },
  { text: 'Discover amazing sites with button bellow', icon: 'i-carbon-image-search', subtext: 'Like discover new things, this is for you.' },
]
</script>

<template>
  <v-card
    class="mx-auto"
    mt-8
    max-width="600"
    tile
  >
    <div text-xl m-3 mb-1>
      Here you can do the following with your bookmarks:
    </div>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
    >
      <div class="flex">
        <span text-left text-2xl m-3>
          <v-icon v-if="item.icon" :color="color_return(i + 1)" :icon="item.icon" />
          <span ml-3>{{ item.text }}</span>
          <br><span text-lg>{{ item.subtext }}</span>
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
</template>
