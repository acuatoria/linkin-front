<script setup>
useHead({
  title: 'Discover Links',
})

const needle = ref('')
const category_search = ref('')
const user = useUserStore()
const loading = ref(true)
const userLinks = shallowRef([])
const categories = ref([])
const server_error = ref('')
const page = ref(1)
const items_number = ref(0)
const items_x_page = ref(10)

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
    userLinks.value = await Url.discover(page.value, needle.value, category_search.value ? category_search.value.id : '')
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

const items = computed(() => {
  if (userLinks.value.results)
    return userLinks.value.results
})
</script>

<template>
  <div class="my_links">
    <Header path="Discover Links" />
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
          label="Filter by category"
          variant="outlined"
        />
      </v-responsive>
      <v-responsive
        class="mx-auto"
        max-width="300"
      />
    </div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    />
    <Dialog :message="server_error" />
    <v-list>
      <v-item-group v-for="record, index in items" :key="record.id">
        <DiscoverLink :record="record" :categories="categories" />
        <hr :style="`border-color:${color_return(index + 5)}`">
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
