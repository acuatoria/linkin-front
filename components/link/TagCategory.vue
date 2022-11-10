<script>
export default {
  props: ['record', 'categories', 'categoryName'],
}
</script>

<template>
  <v-chip
    v-if="categories
      && record.category
      && categories.find(item => item.id === record.category)"
    color="deep-orange"
  >
    {{ categories.find(item => item.id === record.category).name }}
  </v-chip>
  <v-chip v-else-if="categoryName" color="deep-orange">
    {{ categoryName }}
  </v-chip>
  <v-chip v-else color="deep-orange">
    {Uncategorized}
  </v-chip>
</template>
