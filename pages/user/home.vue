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
  if (record.description.toLowerCase().includes(haystack.value.toLowerCase())
      || record.url.toLowerCase().includes(haystack.value.toLowerCase()))
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
          placeholder="Filter records"
          density="compact"
          variant="outlined"
          :clearable="true"
        />
      </v-responsive>
      <v-responsive
        class="mx-auto"
        max-width="300"
      >
        <v-select
          v-model="category_search"
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

    <v-list v-for="record, index in userLinks.results" :key="record.id">
      <v-item-group
        :style="{ display: search(record) ? 'unset' : 'none' }"
      >
        <UserHomeLink :record="record" :categories="categories" :index="index" @update="update" />
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
