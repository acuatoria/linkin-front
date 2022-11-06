<script>
export default {
  props: ['id'],
  emits: ['update'],
  data() {
    return ({
      response: {},
    })
  },
  head() {
    return {
      title: 'Link & comments',
    }
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
      {{ response.url }}
    </a>
  </v-card>
  <v-chip
    v-if="response.category_name"
  >
    {{ response.category_name }}
  </v-chip>
</template>

<style scoped>
.v-card{
    padding: 1em;
}
</style>
