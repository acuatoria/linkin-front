<script>
export default {
  props: ['categoryName'],
}
</script>

<template>
  <v-chip v-if="categoryName" color="deep-orange">
    {{ categoryName }}
  </v-chip>
  <v-chip v-else color="deep-orange">
    {Uncategorized}
  </v-chip>
</template>
