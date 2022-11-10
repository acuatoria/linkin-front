<script>
export default {
  props: ['record', 'categories'],
  emits: ['update'],
  data() {
    return ({
      showDialog: false,
    })
  },
}
</script>

<template>
  <Dialog :message="record.description || '{Here your description}'" :show="showDialog" />
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
          <LinkTagCategory :record="record" :categories="categories" />
        </div>
        <div>
          <LinkTagComment :url-id="record.url_id" :comments="record.comments" />
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

