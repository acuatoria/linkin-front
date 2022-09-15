<script>
export default {
  props: ['record'],
  emits: ['update'],
  data() {
    return ({
      menu: false,
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
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
    >
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
          <DeleteLink :id="record.id" @update="update" @click="menu = false" />
        </v-list-item>
        <v-list-item>
          <EditLink :record="record" @update="update" @click="menu = false" />
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
