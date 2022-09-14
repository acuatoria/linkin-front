<script setup>
const items = [
  { text: 'Manage here your links', icon: 'i-carbon-link' },
  { text: 'Discover new sites', icon: 'i-carbon-image-search' },
  { text: 'Share links collections', icon: 'i-carbon-share-knowledge' },
  { text: 'Comments on links', icon: 'i-carbon-add-comment' },
]
</script>

<template>
  <div class="grid grid-flow-column">
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
            <v-icon v-if="item.icon" :color="color_return(i + 1)" :icon="item.icon" />
            <span ml-3>{{ item.text }}</span>
          </span>
        </div>
      </v-list-item>
    </v-card>
  </div>
</template>
