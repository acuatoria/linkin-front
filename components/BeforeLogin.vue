<script setup>
const dialog = ref(false)
</script>

<template>
  <div>
    <v-dialog
      v-model="dialog"
      scroll-strategy="close"
      text-center
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          rounded="lg"
          color="amber"
        >
          <v-icon icon="i-line-md:account-small" />
          <span ml-2 text-l>Log in</span>
        </v-btn>
      </template>

      <v-card m-auto class="modal">
        <Login @cancel="dialog = false" />
        <EmailResetPassword />
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.modal{
  min-width: 270px;
  min-height: 300px;
}
</style>
