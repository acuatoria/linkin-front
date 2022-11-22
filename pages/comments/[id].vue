<script setup>
useHead({
  title: 'Comments',
})

const user = useUserStore()
const updated = ref(0)
</script>

<template>
  <div>
    <Header path="Link & comments" />
    <CommentsLink :id="$route.params.id" />
    <CommentsUserCommentForm v-if="user" :id="$route.params.id" :key="updated" @update="updated++" />
    <CommentsTheComments :id="$route.params.id" :key="updated" />
  </div>
</template>
