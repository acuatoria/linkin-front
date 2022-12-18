<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup() {
    return { v_reset$: useVuelidate() }
  },
  data() {
    return ({
      response: {},
      dialog2: false,
      email: '',
      api_error: '',
      sending: false,
    })
  },
  validations() {
    return {
      email: { required },
    }
  },
  methods: {
    async submitFormReset() {
      const isFormCorrect = await this.v_reset$.$validate()
      if (!isFormCorrect)
        return
      this.api_error = ''
      this.sending = true
      this.submit()
    },
    async submit() {
      try {
        this.response = await ResetPassword.email_reset_password({
          data: {
            email: this.email,
          },
        })
        this.dialog2 = false
        this.email = ''
        this.sending = false
        this.api_error = ''
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
      v-model="dialog2"
      scroll-strategy="close"
      text-center
    >
      <template #activator="{ props }">
        <v-btn

          v-bind="props"
        >
          <v-icon icon="i-line-md:account" />
          <span ml-2 text-l>Forgot password?</span>
        </v-btn>
      </template>

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
          ref="form_reset"
        >
          <div :class="{ 'text-red': v_reset$.email.$errors.length }">
            <v-text-field
              v-model="email"
              type="username"
              label="email"
            />
            <div v-for="error of v_reset$.email.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <v-btn
            color="purple"
            class="m-3"
            :disabled="sending"
            @click="submitFormReset"
          >
            Send reset password email
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
