<script setup>
useHead({
  title: 'My links',
})
definePageMeta({
  middleware: ['auth'],
})
const user = useUserStore()

const records = ref([])

async function update() {
  records.value = await UserLinks.index(user.token)
}

onMounted(async () => {
  update()
})
</script>

<template>
  <div class="my_links">
    <Header path="My links" />
    <div mb-5 mt-5 flex justify-end class="header">
      <NewLink @update="update" />
    </div>

    <v-list v-for="record in records.results" :key="record.id">
      <v-item-group>
        <v-item>
          <div flex flex-row justify-between items-center>
            <div text-left ml-3 overflow-x-auto>
              <div class="item-text">
                <span text-size-lg>{{ record.description }}</span>
              </div>

              <div class="item-text" text-size-sm>
                {{ record.url }}
              </div>
            </div>

            <div class="options_btn">
              <LinkOptions :id="record.id" @update="update" />
            </div>
          </div>
        </v-item>
      </v-item-group>
    </v-list>
  </div>
</template>

<style scoped>
.header > *{
  margin:auto;
  width: 50%;
}
.options_btn{
  max-width: 50px;
}
.item-text{
  line-height: 1.4em;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
