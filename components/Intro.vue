<script setup>
const items = [
  { text: 'Save and manage your links', icon: '🖇️', subtext: 'See them in any device and in any browser', helptext: 'With your user you can save your bookmarks and manage them. Having access to your bookmarks in every device or browser. You can set a private description and a category for filter them.', color: '#FFE0B2', openhelp: ref(false) },
  { text: 'Comment on every link', icon: '💬', subtext: 'Write and read comments on any url', helptext: 'Each link has an icon that leads you to its comment\'s page where you can post and read comments about it. You need to be registered for comment', color: '#FFCC80', openhelp: ref(false) },
  { text: 'Private and public links collections', icon: '🔒', subtext: 'Share your links with collections', helptext: 'You can create collections with links inside, for example a wish list. Collections can be public or private, if it\'s public you can share the link for others can see your collection. Each collection has a unique url you can share', color: '#FFB74D', openhelp: ref(false) },
  { text: 'Discover new stuff', icon: '🧭', subtext: 'Search is important, but also discover new things', helptext: 'This feature is registration free to use and you can enter by the button below. In discover you can see links that users has marked as public', color: '#FFA726', openhelp: ref(false) },
]
const tldr = { show: false }
</script>

<template>
  <v-container>
    <v-row>
      <v-col ms-0 cols="12" text-xl text-gray class="font-weight-bold">
        So easy, so free, so
        <Register />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, i) in items" :key="i"
        cols="12"
        lg="6"
      >
        <v-card
          text-left
          m-auto
          elevation="0"
          max-width="600"
          @click="item.openhelp.value = !item.openhelp.value"
        >
          <div p-1>
            <v-card-title class="text-h6">
              <v-text mr-2>
                {{ item.icon }}
              </v-text>

              <v-text text-amber>
                {{ item.text }}
              </v-text>
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
      <v-col cols="12" mt-10>
        <NuxtLink to="/discover">
          <v-btn
            color="amber"
          >
            Go to Discover
          </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-subtitle, .v-card-title{
  white-space: unset !important;
}
.v-card-actions{
  padding: 0;
  min-height: unset !important;
}
.v-col, .v-col-12{
  padding: 6px;
}
</style>
