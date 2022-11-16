<script setup>
useHead({
  title: 'My collections',
})
definePageMeta({
  middleware: ['auth'],
})

const user = useUserStore()
const loading = ref(true)
const collections = shallowRef([])
const server_error = ref('')
const page = ref(1)
const items_number = ref(0)
const items_x_page = ref(10)

watch(page, (newValue) => {
  update()
})

async function update(data) {
  loading.value = true
  server_error.value = ''
  try {
    collections.value = await Collection.index(user.token)
  }
  catch (error) {
    server_error.value = 'Error at server'
  }
  loading.value = false
}

onMounted(async () => {
  update()
})
</script>

<template>
  <div class="my_links">
    <Header path="My collections" />
    <div flex flex-row flex-wrap class="header">
      <v-responsive
        class="mx-auto"
        max-width="300"
      >
        <a href="" @click="router.push('user-home')" />
      </v-responsive>
    </div>
    <ErrorDialog :message="server_error" />
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    />
    <div flex flex-row flex-wrap class="header">
      <v-responsive
        mx-auto
        max-width="150"
      >
        <v-btn
          color="purple"
          @click="$router.push(`/user/home`)"
        >
          Links
        </v-btn>
      </v-responsive>
      <CollectionNew @update="update" />
    </div>
    <v-list>
      <v-item-group v-for="record, index in collections" :key="record.id">
        <CollectionLink
          class="collection"
          :record="record"
          :index="index"
          @update="update"
        />
        <hr>
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
.collection{
  min-height: 90px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
