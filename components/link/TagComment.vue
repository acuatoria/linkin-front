<script>
export default {
  props: ['urlId', 'comments'],
}
</script>

<template>
  <v-chip
    color="amber"
    @click="$router.push(`/comments/${urlId}`)"
  >
    {{ comments }} <v-icon ml-1>
      mdi-comment-multiple
    </v-icon>
  </v-chip>
</template>
