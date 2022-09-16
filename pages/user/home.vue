<script setup>
import Dialog from '~~/components/Dialog.vue'
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

const server_error = ref('')

async function update() {
  try {
    useCategoryStore().categories = await Category.index(user.token)
    categories.value = useCategoryStore().categories
    userLinks.value = await UserLink.index(user.token)
  }
  catch (error) {
    server_error.value = 'Error at server'
  }
}
onMounted(async () => {
  update()
})

function search(record) {
  if (record.description.toLowerCase().includes(haystack.value.toLowerCase())
      || record.url.toLowerCase().includes(haystack.value.toLowerCase()))
    return true
  else return false
}
</script>

<template>
  <div class="my_links">
    <Header path="My links" />
    <div mb-5 mt-5 flex justify-end class="header">
      <input v-model="haystack" type="text" placeholder="Filter records">
      <!-- Filter by categories -->
      <NewLink @update="update" />
    </div>
    <Dialog :error="server_error" />

    <v-list v-for="record, index in userLinks.results" :key="record.id">
      <v-item-group
        :style="{ display: search(record) ? 'unset' : 'none' }"
      >
        <Link :record="record" :categories="categories" :index="index" @update="update" />
      </v-item-group>
    </v-list>
  </div>
</template>

<style scoped>
.header > *{
  margin:auto;
  width: 50%;
}
</style>
