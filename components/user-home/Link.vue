<script setup>
defineProps({
  record: {},
  categories: {},
  index: Number,

})
defineEmits(['update'])
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
          v-if="categories.results
            && record.category
            && categories.results.find(item => item.id === record.category)"
          :color="color_return(1 * index)"
        >
          {{ categories.results.find(item => item.id === record.category).name }}
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

