<script setup>
useHead({
  meta: [
    {
      hid: 'og-image',
      property: 'og:image',
      content: 'https://pyxilink.com/og_image.png',
    },
  ],
})
const route = useRoute()
const updated = ref(0)

const url = await useAsyncData(() => {
  return Url.get(route.params.id)
})
</script>

<template>
  <div>
    <Head>
      <Title>{{ `Comments on ${url.data.value.title}` }}</Title>
    </Head>
    <ClientOnly>
      <Header path="Link & comments" />
      <CommentsLink :id="$route.params.id" />
      <CommentsUserCommentForm v-if="$auth.loggedIn" :id="$route.params.id" :key="updated" @update="updated++" />
      <div v-else>
        <v-card m-5 text-sm>
          You need to be logged in to comment.
        </v-card>
      </div>
      <CommentsTheComments :id="$route.params.id" :key="updated" />
    </ClientOnly>
  </div>
</template>
