<script>
export default {
  props: ['urlId', 'comments'],
}
</script>

<template>
  <v-chip
    color="amber"
  >
    <v-button @click="$router.push(`/comments/${urlId}`)">
      {{ comments }} <v-icon>mdi-comment-multiple</v-icon>
    </v-button>
  </v-chip>
</template>
