<script>
import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'

export default {
  props: ['token'],
  emits: ['changeSuccess'],
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return ({
      response: {},
      dialog: true,
      password: '',
      password_bis: '',
      api_error: '',
      sending: false,
    })
  },
  validations() {
    return {
      password: { required },
      password_bis: { required, sameAsPassword: sameAs(this.password) },
    }
  },
  async mounted() {
    try {
      this.response = await ResetPassword.validate_token(this.token)
    }
    catch (error) {
      if (error.status === 400) { this.api_error = 'This token is not valid' }
      else {
        try {
          const error_msg = await error.response._data
          this.api_error += `: ${Object.values(error_msg).toString()}`
        }
        catch (err) {}
      }
      this.sending = false
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect)
        return
      this.api_error = ''
      this.sending = true
      this.submit()
    },
    async submit() {
      try {
        this.response = await ResetPassword.reset_password({
          data: {
            password: this.password,
          },
        }, this.token)
        this.password = ''
        this.password_bis = ''
        this.sending = false
        this.$emit('changeSuccess')
        this.dialog = false
      }
      catch (error) {
        this.api_error = 'Server error'
        try {
          const error_msg = await error.response._data
          this.api_error += `: ${Object.values(error_msg).toString()}`
        }
        catch (err) {}
        this.sending = false
      }
    },
  },
}
</script>

<template>
  <div>
    <v-dialog
      v-model="dialog"
      scroll-strategy="close"
      text-center
    >
      <v-card m-auto class="modal">
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
          <div :class="{ 'text-red': v$.password.$errors.length }">
            <v-text-field
              v-model="password"
              type="password"
              label="password"
              autocomplete="new-password"
            />
            <div v-for="error of v$.password.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div :class="{ 'text-red': v$.password_bis.$errors.length }">
            <v-text-field
              v-model="password_bis"
              type="password"
              label="repeat password"
            />
            <div v-for="error of v$.password_bis.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <v-btn
            color="orange"
            class="m-3"
            :disabled="sending"
            @click="submitForm"
          >
            Set this new password
            <v-icon v-show="sending" icon="i-line-md:loading-alt-loop" />
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.modal{
  min-width: 270px;
}
</style>
