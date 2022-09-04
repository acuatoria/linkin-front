<script>
export default {
  props: ['id'],
  data() {
    return ({
      response: {},
      user: useUserStore(),
      dialog: false,
      api_error: '',
      sending: false,
    })
  },
  validations() {
    return {
      url: { required },
    }
  },
  methods: {
    async submitForm() {
      this.api_error = ''
      this.sending = true
      this.submit()
    },
    async submit() {
      const user = useUserStore()
      try {
        this.response = await UserLinks.delete({ id: this.id, token: user.token })
        this.dialog = false
      }
      catch (error) {
        const errore = await error
        this.api_error = Object.values(errore).toString()
        this.sending = false
      }
    },
  },
}
</script>

<template>
  <v-dialog
    v-model="dialog"
  >
    <template #activator="{ props }">
      <v-btn

        color="primary"
        v-bind="props"
      >
        <v-icon icon="i-line-md:remove" />
      </v-btn>
    </template>

    <v-card width="50vh">
      <v-alert
        v-if="api_error"
        prominent
        type="error"
        variant="outlined"
      >
        {{ api_error }}
      </v-alert>
      <v-form
        ref="form"
      >
        Do you want to remove this link?
        <v-btn
          color="primary"
          class="mr-4"
          :disabled="sending"
          @click="submitForm"
        >
          Yes
          <v-icon v-show="sending" icon="i-line-md:loading-alt-loop" />
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>
