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
    <div flex justify-end class="header">
      <NewLink @update="update" />
    </div>

    <v-list v-for="record in records.results" :key="record.id">
      <v-item-group>
        <v-item>
          <div flex flex-row justify-between items-center>
            <div text-left ml-3 overflow-x-auto>
              <div class="item-text">
                <span text-size-sm>{{ record.description }}</span>
              </div>

              <div class="item-text" text-size-xs>
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
  max-height: 60px;
  line-height: 20px;
  overflow-x: scroll;
  white-space: nowrap;
}
</style>
