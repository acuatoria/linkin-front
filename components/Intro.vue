<script setup>
const items = [
  { text: 'Save and manage your links', icon: 'i-carbon-link', subtext: 'See them in any device and in any browser', helptext: 'With your user you can save your bookmarks and manage them. Having access to your bookmarks in every device or browser. You can set a private description and a category for filter them.', color: '#4219E6', openhelp: ref(false) },
  { text: 'Comment on links', icon: 'i-carbon-add-comment', subtext: 'Write and read comments on any url', helptext: 'Each link has an icon that leads you to its comment\'s page where you can post and read comments about it. You need to be registered for comment', color: '#6419E6', openhelp: ref(false) },
  { text: 'Share collections of links', icon: 'i-carbon-share-knowledge', subtext: 'Share your links with collections', helptext: 'You can create collections with links inside, for example a wish list. Collections can be public or private, if it\'s public you can share the link for others can see your collection. Each collection has a unique url you can share', color: '#8619E6', openhelp: ref(false) },
  { text: 'Discover new stuff', icon: 'i-carbon-image-search', subtext: 'Search is important, but also discover new things', helptext: 'This feature is registration free to use and you can enter by the button below. In discover you can see links that users has marked as public', color: '#A819E6', openhelp: ref(false) },
]
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <div text-sm m-3>
            <h1>Manage your bookmarks, discover links, share links and comment them</h1>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-for="(item, i) in items" :key="i"
        cols="12"
      >
        <v-card
          text-left
          m-auto
          max-width="600"
          :color="item.color"
          theme="dark"
          @click="item.openhelp.value = !item.openhelp.value"
        >
          <div p-1>
            <v-card-title class="text-h6">
              <v-icon
                :icon="item.icon"
                mr-2
              />
              {{ item.text }}
            </v-card-title>

            <v-card-subtitle>{{ item.subtext }}</v-card-subtitle>
            <v-expand-transition>
              <div v-show="item.openhelp.value">
                <v-card-text>
                  {{ item.helptext }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div mt-5>
    <NuxtLink to="/discover">
      <v-btn
        color="pink"
      >
        Go to Discover
      </v-btn>
    </NuxtLink>
  </div>
</template>

<style scoped>
.v-card-subtitle, .v-card-title{
  white-space: unset !important;
}
.v-card-actions{
  padding: 0;
  min-height: unset !important;
}
</style>
