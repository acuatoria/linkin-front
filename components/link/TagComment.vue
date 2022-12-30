<script>
export default {
  props: ['urlId', 'comments'],
}
</script>

<template>
  <NuxtLink :to="`/comments/${urlId}`" title="Home">
    <v-chip
      color="amber"
    >
      {{ comments }} <v-icon ml-1>
        mdi-comment-multiple
      </v-icon>
    </v-chip>
  </NuxtLink>
</template>
