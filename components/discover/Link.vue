<script>
export default {
  props: ['record', 'categories'],
  data() {
    return ({
      categoryName: '',
    })
  },
  mounted() {
    if (this.categories && this.record.category
      && this.categories.find(item => item.id === this.record.category))
      this.categoryName = this.categories.find(item => item.id === this.record.category).name
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
              <span text-size-lg>
                {{ record.title || '&nbsp;' }}
              </span>
            </div>

            <div class="item-text" text-size-sm>
              {{ record.url }}
            </div>
          </a>
        </div>
      </div>
      <div flex>
        <LinkTagCategory :category-name="categoryName" />
        <LinkTagComment :url-id="record.url_id || record.id" :comments="record.comments" />
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
  min-height: 120px;
}
</style>

