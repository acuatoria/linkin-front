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
      this.menu = false
    },
  },
}
</script>

<template>
  <div>
    <v-menu
      v-model="menu"
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
          <UserHomeEditLink :record="record" @update="update" />
        </v-list-item>
        <v-list-item>
          <UserHomeDeleteLink :id="record.id" @update="update" />
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
