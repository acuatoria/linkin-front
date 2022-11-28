<script setup>
definePageMeta({
  title: 'Collection',
})

const id = ref('')
const needle = ref('')
const category_search = ref('')
const loading = ref(true)
const collection = shallowRef([])
const userLinks = shallowRef([])
const categories = ref([])
const collections = ref([])
const server_error = ref('')
const page = ref(1)
const items_number = ref(0)
const items_x_page = ref(10)
const route = useRoute()
const urlToUpdate = ref('')
const owner = ref(false)
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
  update()
})

async function update(data) {
  urlToUpdate.value = ''
  loading.value = true
  try {
    useCategoryStore().categories = await Category.index()
    categories.value = useCategoryStore().categories
    collection.value = await Collection.get(id.value)
    const user_collections = await Collection.index()
    owner.value = user_collections.filter(item => item.id === id.value).length > 0
    if (owner.value) {
      userLinks.value = await UserLink.index(
        page.value,
        needle.value,
        category_search.value ? category_search.value.id : '',
        id.value,
      )
    }
    else {
      userLinks.value = await Collection.items(id.value, page.value, needle.value, category_search.value ? category_search.value.id : '')
    }
    items_number.value = userLinks.value.count
    urlToUpdate.value = data ? data.url : ''
    useHead({
      title: `Collection: ${collection.value.name}`,
    })
  }
  catch (error) {
    server_error.value = 'Error at server'
  }
  loading.value = false
}

onMounted(async () => {
  id.value = route.params.id
  collections.value = useCollectionStore().collections
  update()
})

const items = computed(() => {
  if (userLinks.value)
    return userLinks.value.results
})
</script>

<template>
  <div>
    <ClientOnly>
      <Header path="Collection" />
      <div><b>{{ collection.name }}</b>: {{ collection.description }}</div>
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
          />
        </v-responsive>
        <v-responsive
          class="mx-auto"
          max-width="250"
        >
          <UserHomeNewLink
            v-if="$auth.loggedIn && owner"
            :collection="id"
            @update="update($event, data)"
          />
        </v-responsive>
      </div>
      <ErrorDialog :message="server_error" />
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      />
      <div v-if="items_number > 0">
        <v-list class="listado">
          <v-item-group v-for="record, index in items" :key="record.id">
            <div v-if="owner">
              <UserHomeLink
                :record="record"
                :index="index"
                :url-to-update="urlToUpdate"
                @update="update($event, data)"
              />
            </div>
            <div v-else>
              <DiscoverLink :record="record" :categories="categories" />
            </div>
          </v-item-group>
        </v-list>
        <v-pagination
          v-model="page"
          :records="items_number"
          :length="items_number >= items_x_page ? Math.ceil(items_number / items_x_page) : 1"
        />
      </div>
      <div v-else-if="!loading">
        No items on this collection
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.header > *{
  margin:auto;
  width: 50%;
}
</style>
