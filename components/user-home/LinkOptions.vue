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
    update(data) {
      this.$emit('update', data)
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
          icon
          v-bind="props"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <UserHomeEditLink :record="record" @update="update($event, data)" />
        </v-list-item>
        <v-list-item>
          <UserHomeDeleteLink :id="record.id" @update="update" />
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
