<script>
export default {
  props: ['id'],
  emits: ['update'],
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
        this.response = await UserLink.delete({ id: this.id, token: user.token })
        this.$emit('update')
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
    scroll-strategy="close"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="red"
      >
        <v-icon icon="i-line-md:remove" />
        &nbsp;Delete link
      </v-btn>
    </template>

    <v-card class="alert_form">
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
        flex
        flex-col
      >
        <span m-5>Do you want to remove this link?</span>
        <v-btn
          color="red"
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

<style scoped>
  .alert_form{
    width: 90%;
    max-width: 300px;
    margin: auto;
  }
</style>
