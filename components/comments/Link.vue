<script>
export default {
  props: ['id'],
  emits: ['update'],
  data() {
    return ({
      response: {},
    })
  },
  mounted() {
    this.getUrlInfo()
  },
  methods: {
    async getUrlInfo() {
      const user = useUserStore()
      this.response = await Url.get(user.token, this.id)
    },
  },
}
</script>

<template>
  <v-card>
    <a :href="response.url" target="_blank">
      <div v-if="response.title">
        {{ response.title }}
      </div>
      {{ response.url }}
    </a>
  </v-card>
  <LinkTagCategory :category-name="response.category_name" />
  <LinkTagComment :url-id="response.id" :comments="response.comments" />
</template>

<style scoped>
.v-card{
    padding: 1em;
}
</style>
