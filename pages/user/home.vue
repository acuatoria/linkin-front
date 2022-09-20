<script setup>
useHead({
  title: 'My links',
})
definePageMeta({
  middleware: ['auth'],
})

const haystack = ref('')
const category_search = ref('')
const user = useUserStore()
const loading = ref(true)
const userLinks = ref([])
const categories = ref({})
const server_error = ref('')

async function update() {
  loading.value = true
  try {
    useCategoryStore().categories = await Category.index(user.token)
    categories.value = useCategoryStore().categories
    userLinks.value = await UserLink.index(user.token)
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
  let match = true
  const haystack_ = haystack.value.toLowerCase().trim()
  if (record.description.toLowerCase().includes(haystack_)
      || record.url.toLowerCase().includes(haystack_))
    match = match & true
  else
    match = match & false

  if (category_search.value) {
    if (record.category === category_search.value.id)
      match = match & true
    else
      match = match & false
  }

  return match
}
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
          v-model="haystack"
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
          class="mt-5"
          :items="categories.results"
          item-title="name"
          item-value="id"
          :clearable="true"
          density="compact"
          label="Filter by category"
          variant="outlined"
          return-object
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
      <v-item-group v-for="record, index in userLinks.results" :key="record.id">
        <UserHomeLink v-if="search(record)" :record="record" :categories="categories" :index="index" @update="update" />
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
