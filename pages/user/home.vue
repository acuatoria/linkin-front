<script setup>
useHead({
  title: 'My links',
})
definePageMeta({
  middleware: ['auth'],
})

const needle = ref('')
const category_search = ref('')
const user = useUserStore()
const loading = ref(true)
const userLinks = shallowRef([])
const categories = ref({})
const server_error = ref('')
const page = ref(1)
const items_number = ref(0)
const items_x_page = ref(10)

async function update() {
  loading.value = true
  try {
    useCategoryStore().categories = await Category.index(user.token)
    categories.value = useCategoryStore().categories
    userLinks.value = await UserLink.index(user.token)
    items_number.value = userLinks.value.count
  }
  catch (error) {
    server_error.value = 'Error at server'
  }
  loading.value = false
}

onMounted(async () => {
  update()
})

function search(record) {
  if (!needle.value && !category_search.value)
    return true

  let match = true
  const needle_ = needle.value.toLowerCase().trim()
  if (record.description.toLowerCase().includes(needle_)
      || record.url.toLowerCase().includes(needle_))
    match = match & true
  else
    match = match & false

  if (category_search.value) {
    if (record.category === category_search.value.id)
      match = match & true
    else
      match = match & false
  }
  return Boolean(match)
}

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size)
}

const items = computed(() => {
  if (userLinks.value.results)
    return paginate(userLinks.value.results.filter(item => search(item) === true), items_x_page.value, page.value)
})
</script>

<template>
  <div class="my_links">
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
        />
      </v-responsive>
      <v-responsive
        max-width="300"
      >
        <v-select
          v-model="category_search"
          :items="categories.results"
          item-title="name"
          item-value="id"
          return-object
          :clearable="true"
          density="compact"
          class="mt-5"
          label="Filter by category"
          variant="outlined"
        />
      </v-responsive>
      <v-responsive
        class="mx-auto"
        max-width="300"
      >
        <UserHomeNewLink @update="update" />
      </v-responsive>
    </div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    />

    <Dialog :error="server_error" />

    <v-list>
      <v-item-group v-for="record, index in items" :key="record.id">
        <UserHomeLink :record="record" :categories="categories" :index="index" @update="update" />
      </v-item-group>
    </v-list>
    <v-pagination
      v-model="page"
      :records="items_number"
      :length="items_number >= items_x_page ? Math.ceil(items_number / items_x_page) : 1"
    />
  </div>
</template>

<style scoped>
.header > *{
  margin:auto;
  width: 50%;
}
</style>
