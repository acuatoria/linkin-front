<script>
export default {
  data() {
    return ({
      id: String,
      user: Object,
      updated: 0,
    })
  },
  mounted() {
    this.id = this.$route.params.id
    this.user = useUserStore()
  },

  methods: {
    update() {
      this.updated++
    },
  },
}
</script>

<template>
  <div>
    <Header path="Link & comments" />
    <CommentsLink :id="$route.params.id" />
    <CommentsUserCommentForm v-if="user" :id="$route.params.id" :key="updated" @update="update" />
    <CommentsTheComments :id="$route.params.id" :key="updated" />
  </div>
</template>
