<script>
export default {
  props: ['record', 'urlToUpdate', 'index'],
  emits: ['update'],
  data() {
    return ({
      showDialog: false,
      title: '',
      attempts: 5,
      fetching_title: false,
      categories: useCategoryStore().categories,
    })
  },
  computed: {
    categoryName() {
      if (this.categories && this.record.category
      && this.categories.find(item => item.id === this.record.category))
        return this.categories.find(item => item.id === this.record.category).name
      return ''
    },
  },
  watch: {
    urlToUpdate() {
      this.check_for_update()
    },
  },
  mounted() {
    this.title = this.record.url_title || '{ pending title }'
    this.check_for_update()
  },
  methods: {
    check_for_update() {
      if (this.record.url && !this.record.url_title && this.urlToUpdate === this.record.url && this.attempts === 5)
        this.update_title()
    },
    update(data) {
      this.$emit('update', data)
    },
    update_title() {
      this.title = 'fetching title'
      this.fetching_title = true
      setTimeout(this.getUrlInfo, 1000)
    },
    async getUrlInfo() {
      this.response = await Url.get(this.record.url_id)
      if (this.response.title) { this.title = this.response.title; this.fetching_title = false }
      else if (this.attempts < 1) { this.title = '{ pending title }'; this.fetching_title = false }
      else {
        this.attempts--
        setTimeout(this.getUrlInfo, 1000 * (5 - this.attempts + 1) ** 2)
      }
    },
  },

}
</script>

<template>
  <Dialog :message="record.description || '{ your description }'" :show="showDialog" />
  <div class="userlink">
    <v-item>
      <div flex flex-row justify-between items-center>
        <div text-left ml-3 overflow-x-auto>
          <a :href="record.url" target="_blank">
            <div class="item-text mt-2 me-2">
              <span text-size-lg>
                <v-icon v-if="fetching_title" icon="i-line-md:loading-alt-loop" />
                {{ title }}
              </span>
            </div>

            <div class="item-text" text-size-sm>
              {{ record.url }}
            </div>
          </a>
        </div>

        <div class="options_btn">
          <UserHomeLinkOptions :record="record" @update="update($event, data)" />
        </div>
      </div>
      <div flex flex-row>
        <div>
          <LinkTagCategory :category-name="categoryName" />
        </div>
        <div>
          <LinkTagComment :url-id="record.url_id" :comments="record.comments" />
        </div>
        <div class="flex-no-overflow">
          <v-chip color="blue-grey" @click="showDialog = !showDialog">
            {{ record.description || '{ your description }' }}
          </v-chip>
        </div>
      </div>
    </v-item>
  </div>
</template>

<style scoped>
.options_btn{
  max-width: 50px;
}
.item-text{
  line-height: 1.5em;
  overflow-x: auto;
  white-space: nowrap;
}
.userlink{
  min-height: 120px;
}
.flex-no-overflow{
  min-width: 0;
}
</style>

