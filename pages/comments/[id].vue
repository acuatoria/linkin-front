<script setup>
useHead({
  title: 'Comments',
})

const updated = ref(0)
</script>

<template>
  <div>
    <ClientOnly>
      <Header path="Link & comments" />
      <CommentsLink :id="$route.params.id" />
      <CommentsUserCommentForm v-if="$auth.loggedIn" :id="$route.params.id" :key="updated" @update="updated++" />
      <CommentsTheComments :id="$route.params.id" :key="updated" />
    </ClientOnly>
  </div>
</template>
