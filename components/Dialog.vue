<script>
export default {
  props: ['message', 'show'],
  data() {
    return {
      dialog: false,
    }
  },
  watch: {
    show() {
      this.dialog = !this.dialog
    },
  },
}
</script>

<template>
  <div text-center>
    <v-dialog
      v-model="dialog"
      activator="parent"
    >
      <v-card>
        <v-card-text text-center>
          <span v-html="message" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
div{
  max-width: 512px;
}
</style>
