<script>
export default {
  props: ['record', 'categories', 'index'],
  emits: ['update'],
  data() {
    return ({
      response: {},
    })
  },
  mounted() {
    this.getCommentsCount()
  },
  methods: {
    async getCommentsCount() {
      const user = useUserStore()
      this.response = await CommentCount.index(user.token, this.record.url_id)
    },
  },
}
</script>

<template>
  <div class="userlink">
    <v-item>
      <div flex flex-row justify-between items-center>
        <div text-left ml-3 overflow-x-auto>
          <a :href="record.url" target="_blank">
            <div class="item-text">
              <span text-size-lg>{{ record.description }}</span>
            </div>

            <div class="item-text" text-size-sm>
              {{ record.url }}
            </div>
          </a>
        </div>

        <div class="options_btn">
          <UserHomeLinkOptions :record="record" @update="$emit('update')" />
        </div>
      </div>
      <div flex>
        <v-chip
          v-if="categories
            && record.category
            && categories.find(item => item.id === record.category)"
          :color="color_return(1 * index)"
        >
          {{ categories.find(item => item.id === record.category).name }}
        </v-chip>
        <v-chip
          :color="color_return(1 * index)"
        >
          <a @click="$router.push(`/link-page/${record.url_id}`)">
            {{ response.comments }}<v-icon>mdi-comment-multiple</v-icon>
          </a>
        </v-chip>
      </div>
    </v-item>
  </div>
</template>

<style scoped>
.options_btn{
  max-width: 50px;
}
.item-text{
  line-height: 1.4em;
  overflow-x: auto;
  white-space: nowrap;
}
.userlink{
  min-height: 95px;
}
</style>

