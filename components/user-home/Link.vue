<script>
export default {
  props: ['record', 'categories', 'index'],
  emits: ['update'],
  data() {
    return ({
      showDialog: false,
    })
  },
}
</script>

<template>
  <Dialog :message="record.description" :show="showDialog" />
  <div class="userlink">
    <v-item>
      <div flex flex-row justify-between items-center>
        <div text-left ml-3 overflow-x-auto>
          <a :href="record.url" target="_blank">
            <div class="item-text">
              <span text-size-lg>{{ record.url_title || '&nbsp;' }}</span>
            </div>

            <div class="item-text" text-size-sm h-8>
              {{ record.url }}
            </div>
          </a>
        </div>

        <div class="options_btn">
          <UserHomeLinkOptions :record="record" @update="$emit('update')" />
        </div>
      </div>
      <div flex flex-row>
        <div>
          <v-chip
            v-if="categories
              && record.category
              && categories.find(item => item.id === record.category)"
            color="deep-orange"
          >
            {{ categories.find(item => item.id === record.category).name }}
          </v-chip>
        </div>
        <div>
          <v-chip
            color="blue-grey"
            @click="$router.push(`/link-page/${record.url_id}`)"
          >
            <span>{{ record.comments }} <v-icon>mdi-comment-multiple</v-icon></span>
          </v-chip>
        </div>
        <div class="flex-no-overflow">
          <v-chip color="amber" @click="showDialog = !showDialog">
            {{ record.description || '{Here your description}' }}
          </v-chip>
        </div>
      </div>
      <hr>
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
  min-height: 100px;
}
.flex-no-overflow{
  min-width: 0;
}
</style>

