<script setup>
useHead({
  title: 'My links',
})
definePageMeta({
  middleware: ['auth'],
})
const needle = ref('')
const category_search = ref('')
const loading = ref(true)
const userLinks = shallowRef([])
const categories = ref([])
const server_error = ref('')
const page = ref(1)
const items_number = ref(0)
const items_x_page = ref(10)
const urlToUpdate = ref('')
const retardo = ref('')

watch(page, (newValue) => {
  update()
})

watch(needle, (newValue) => {
  if (newValue.length > 3 || newValue === '') {
    clearInterval(retardo.value)
    retardo.value = setTimeout(() => { page.value = 1; update() }, 500)
  }
})

watch(category_search, (newValue) => {
  page.value = 1
  update()
})

async function update(data) {
  urlToUpdate.value = ''
  loading.value = true
  server_error.value = ''
  try {
    userLinks.value = await UserLink.index(
      page.value,
      needle.value.trim(),
      category_search.value ? category_search.value.id : '',
      '',
    )
    items_number.value = userLinks.value.count
    urlToUpdate.value = data ? data.url : ''
  }
  catch (error) {
    server_error.value = 'Error at server'
  }
  loading.value = false
}

onMounted(async () => {
  useCategoryStore().categories = await Category.index()
  categories.value = useCategoryStore().categories
  useCollectionStore().collections = await Collection.index()
  update()
})

const items = computed(() => {
  if (userLinks.value.results)
    return userLinks.value.results
})
</script>

<template>
  <div>
    <ClientOnly>
      <Header path="My links" />
      <div flex flex-row flex-wrap class="header">
        <v-responsive
          class="mx-auto"
          max-width="300"
        >
          <v-text-field
            v-model="needle"
            class="mt-5"
            placeholder="Filter records"
            density="compact"
            variant="outlined"
            :clearable="true"
            @click:clear="needle = ''"
          />
        </v-responsive>
        <v-responsive
          max-width="300"
        >
          <v-select
            v-model="category_search"
            :items="categories"
            item-title="name"
            item-value="id"
            return-object
            :clearable="true"
            density="compact"
            class="mt-5"
            color="deep-orange"
            label="Filter by category"
            variant="outlined"
            :menu-props="{ maxHeight: '500px', location: 'top' }"
          />
        </v-responsive>
        <v-responsive
          class="mx-auto"
          max-width="200"
        >
          <UserHomeNewLink @update="update($event, data)" />
        </v-responsive>
        <v-responsive
          class="mx-auto"
          max-width="200"
        >
          <v-btn
            color="green"
            @click="$router.push(`/user/collections`)"
          >
            Collections
          </v-btn>
        </v-responsive>
      </div>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      />

      <ErrorDialog :message="server_error" />

      <v-list class="listado">
        <v-item-group v-for="record, index in items" :key="record.id">
          <UserHomeLink
            :record="record"
            :index="index"
            :url-to-update="urlToUpdate"
            @update="update($event, data)"
          />
        </v-item-group>
      </v-list>
      <v-pagination
        v-model="page"
        :records="items_number"
        :length="items_number >= items_x_page ? Math.ceil(items_number / items_x_page) : 1"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.header > *{
  margin:auto;
  width: 50%;
}
.listado{
  margin-top: 20px;
}
</style>
