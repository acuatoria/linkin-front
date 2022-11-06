<script>
export default {
  props: ['id'],
  emits: ['update'],
  data() {
    return ({
      response: {},
    })
  },
  watch: {
    page() {
      this.getComments()
    },
  },
  mounted() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const user = useUserStore()
      this.response = await Comment.index(user.token, this.id)
    },
  },
}
</script>

<template>
  <v-list>
    <v-item-group v-for="record, index in response" :key="record.id">
      <v-card
        text-sm
        text-left
        :border="true"
        flat="true"
        :density="compact"
        :style="`border-color:${color_return(1 * index)}`"
      >
        {{ record.comment }}
        <div
          text-right
          text-sm
          :style="`color:${color_return(1 * index)}`"
          v-text="`comment by ${record.user_name}`"
        />
      </v-card>
    </v-item-group>
  </v-list>
</template>

<style scoped>
.v-card{
    padding: 1em;
}
</style>
