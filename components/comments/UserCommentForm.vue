<script>
export default {
  props: ['id'],
  emits: ['update'],
  data() {
    return ({
      response: null,
      comment: null,
      has_comment: false,
      user: {},
    })
  },
  mounted() {
    this.getUserComment()
  },
  methods: {
    async getUserComment() {
      this.user = useUserStore()
      this.response = await Comment.get(this.user.token, this.id)
      if (this.response[0]) {
        this.comment = this.response[0]
        this.has_comment = true
      }
    },
    update() {
      this.$emit('update')
    },
  },
}
</script>

<template>
  <div v-if="response">
    <div v-if="has_comment" p-3 class="flex-container" justify-between>
      <div class="button">
        <CommentsDeleteComment class="button" :coment="comment" :url="id" @update="update" />
      </div>
      <div class="button">
        <CommentsEditComment class="button" :user-comment="comment.comment" :url="id" label="Edit my comment" @update="update" />
      </div>
    </div>
    <div v-if="user.isLogged && !has_comment" p-3 m-auto>
      <CommentsEditComment class="button" :coment="comment" :url="id" label="Add a comment" @update="update" />
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {
  .flex-container {
    flex-direction: column;
  }
  .button{
    margin:10px;
  }
}
</style>
