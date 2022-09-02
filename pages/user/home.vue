<script setup>
const user = useUserStore()
const records = await get_user_links(user.token)
</script>

<template>
  My links
  <v-list v-for="record in records.results" :key="record.id">
    <v-item-group>
      <v-item><a :href="record.url" target="_blank">{{ record.url }}</a></v-item>
    </v-item-group>
  </v-list>
</template>
