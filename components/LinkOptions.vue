<script>
export default {
  props: ['id'],
  emits: ['update'],
  data() {
    return ({
      on: false,
    })
  },
  methods: {
    update() {
      this.$emit('update')
    },
  },
}
</script>

<template>
  <div>
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          dark
          icon
          v-bind="props"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <DeleteLink :id="id" @update="update" />
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
