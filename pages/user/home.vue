<script setup>
import DeleteLink from '../../components/DeleteLink.vue'
import NewLink from '~~/components/NewLink.vue'
useHead({
  title: 'My links',
})
definePageMeta({
  middleware: ['auth'],
})
const user = useUserStore()
const records = await UserLinks.index(user.token)
</script>

<template>
  <div>
    <Header />
    My links

    <NewLink />
    <v-list v-for="record in records.results" :key="record.id">
      <v-item-group>
        <v-item>
          <a :href="record.url" target="_blank">{{ record.url }}</a>
          <DeleteLink :id="record.id" />
        </v-item>
      </v-item-group>
    </v-list>
  </div>
</template>
