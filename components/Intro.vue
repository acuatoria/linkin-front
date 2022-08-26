<script setup>
const items = [
  { text: 'Searching is important but also discovering' },
  { text: 'Discover urls', icon: 'i-carbon-image-search' },
  { text: 'Your urls everywhere', icon: 'i-carbon-link' },
  { text: 'Share urls', icon: 'i-carbon-share-knowledge' },
  { text: 'Comments on urls', icon: 'i-carbon-add-comment' },
]
</script>

<template>
  <div class="grid grid-flow-column">
    <v-card
      class="mx-auto"
      max-width="600"
      tile
      :dark="dark"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-content class="flex">
          <span class="text-left"> <v-icon v-if="item.icon" :color="color_return(i + 1)" :icon="item.icon" /> {{ item.text }} </span>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
