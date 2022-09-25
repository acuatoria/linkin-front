<script>
export default {
  props: ['error'],
  data() {
    return {
      dialog: false,
    }
  },
  watch: {
    error() {
      this.dialog = true
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
          {{ error }}
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
