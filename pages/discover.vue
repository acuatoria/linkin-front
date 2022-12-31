<script setup>
useHead({
  title: 'Discover Links',
  meta: [{
    name: 'description',
    content: 'Discover new websites from other users and join us to share your interesting bookmarks.',
  },
  {
    hid: 'og-image',
    property: 'og:image',
    content: 'https://pyxilink.com/logo.svg',
  },
  ],
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

async function update() {
  loading.value = true
  try {
    userLinks.value = await Url.discover(page.value, needle.value, category_search.value ? category_search.value.id : '')
    items_number.value = userLinks.value.count
  }
  catch (error) {
    server_error.value = 'Error at server'
  }
  loading.value = false
}

onMounted(async () => {
  useCategoryStore().categories = await Category.index()
  categories.value = useCategoryStore().categories
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
          max-width="300"
        />
      </div>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      />
      <ErrorDialog :message="server_error" />
      <v-list>
        <v-item-group v-for="record, index in items" :key="record.id">
          <DiscoverLink :record="record" :categories="categories" />
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
</style>
