<script setup>
useHead({
  title: 'Collection',
})

const id = ref('')
const name = ref('')
const needle = ref('')
const category_search = ref('')
const user = useUserStore()
const loading = ref(true)
const collection = shallowRef([])
const userLinks = shallowRef([])
const categories = ref([])
const server_error = ref('')
const page = ref(1)
const items_number = ref(0)
const items_x_page = ref(10)
const route = useRoute()

watch(page, (newValue) => {
  update()
})

watch(needle, (newValue) => {
  if (newValue.length > 3 || newValue === '')
    update()
})

watch(category_search, (newValue) => {
  update()
})

async function update() {
  loading.value = true
  try {
    useCategoryStore().categories = await Category.index(user.token)
    categories.value = useCategoryStore().categories
    collection.value = await Collection.get(user.token, id.value)
    userLinks.value = await Collection.items(user.token, id.value, page.value, needle.value, category_search.value ? category_search.value.id : '')
    items_number.value = userLinks.value.count
  }
  catch (error) {
    server_error.value = 'Error at server'
  }
  loading.value = false
}

onMounted(async () => {
  id.value = route.params.id
  update()
})

const items = computed(() => {
  if (userLinks.value)
    return userLinks.value.results
})
</script>

<template>
  <div class="my_links">
    <Header path="Collection" />
    <div>Collection <b>{{ collection.name }}</b>: {{ collection.description }}</div>
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
        max-width="300"
      />
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
          <DiscoverLink :record="record" :categories="categories" />
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
  </div>
</template>

<style scoped>
.header > *{
  margin:auto;
  width: 50%;
}
</style>
