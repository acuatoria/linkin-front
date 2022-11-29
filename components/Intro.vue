<script setup>
const items = [
  { text: 'Save your links', icon: 'i-carbon-link' },
  { text: 'Comment on links', icon: 'i-carbon-add-comment' },
  { text: 'Share your links collections', icon: 'i-carbon-share-knowledge' },
  { text: 'Discover new links', icon: 'i-carbon-image-search' },
]
</script>

<template>
  <v-card
    class="mx-auto"
    mt-8
    max-width="600"
    tile
  >
    <div text-2xl m-3 mb-1>
      In this web you can:
    </div>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
    >
      <div class="flex">
        <span text-left text-xl m-3>
          <v-icon v-if="item.icon" :color="color_return(i + 1)" :icon="item.icon" />
          <span ml-3>{{ item.text }}</span>
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
