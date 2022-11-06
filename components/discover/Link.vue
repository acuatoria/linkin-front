<script>
export default {
  props: ['record', 'categories', 'index'],
  emits: ['update'],
}
</script>

<template>
  <div class="userlink">
    <v-item>
      <div flex flex-row justify-between items-center>
        <div text-left ml-3 overflow-x-auto>
          <a :href="record.url" target="_blank">
            <div class="item-text">
              <span text-size-lg>{{ record.title || '&nbsp;' }}</span>
            </div>

            <div class="item-text" text-size-sm h-8>
              {{ record.url }}
            </div>
          </a>
        </div>
      </div>
      <div flex>
        <v-chip
          v-if="categories
            && record.category
            && categories.find(item => item.id === record.category)"
          color="deep-orange"
        >
          {{ categories.find(item => item.id === record.category).name }}
        </v-chip>
        <v-chip
          color="blue-grey"
        >
          <v-button @click="$router.push(`/link-page/${record.id}`)">
            {{ record.comments }} <v-icon>mdi-comment-multiple</v-icon>
          </v-button>
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

