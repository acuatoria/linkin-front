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
      this.response = await Url.get(this.id)
    },
  },
}
</script>

<template>
  <v-card>
    <div>
      <a :href="response.url" target="_blank">
        <div v-if="response.title">
          {{ response.title }}
        </div>
        {{ response.url }}
      </a>
    </div>
    <LinkTagCategory :category-name="response.category_name" />
    <LinkTagComment :url-id="response.id" :comments="response.comments" />
  </v-card>
</template>
