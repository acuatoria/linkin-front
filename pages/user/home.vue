<script setup>
useHead({
  title: 'My links',
})
definePageMeta({
  middleware: ['auth'],
})
const haystack = ref('')
const user = useUserStore()

const userLinks = ref([])
const categories = ref({})

async function update() {
  useCategoryStore().categories = await Category.index(user.token)
  categories.value = useCategoryStore().categories
  userLinks.value = await UserLink.index(user.token)
}
// categories.results.find(item => item.id === record.category).name
onMounted(async () => {
  update()
})
</script>

<template>
  <div class="my_links">
    <Header path="My links" />
    <div mb-5 mt-5 flex justify-end class="header">
      <input v-model="haystack" type="text" placeholder="Filter records">
      <NewLink @update="update" />
    </div>

    <v-list v-for="record, index in userLinks.results" :key="record.id">
      <v-item-group
        :style="{ display: record.description.includes(haystack) || record.url.includes(haystack) ? 'unset' : 'none' }"
      >
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
              <LinkOptions :id="record.id" @update="update" />
            </div>
          </div>
          <div flex>
            <v-chip v-if="categories.results && record.category" :color="color_return(1 * index)">
              {{ categories.results.find(item => item.id === record.category).name }}
            </v-chip>
          </div>
        </v-item>
      </v-item-group>
    </v-list>
  </div>
</template>

<style scoped>
.header > *{
  margin:auto;
  width: 50%;
}
.options_btn{
  max-width: 50px;
}
.item-text{
  line-height: 1.4em;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
