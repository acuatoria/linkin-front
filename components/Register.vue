<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  components: { VueRecaptcha },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return ({
      response: {},
      dialog: false,
      username: '',
      email: '',
      password: '',
      api_error: '',
      sending: false,
      recaptcha_response: '',
      show_terms: false,
      terms: false,
    })
  },
  validations() {
    return {
      username: { required },
      email: { required },
      password: { required },
      recaptcha_response: { required },
      terms: { accepted: val => val === true },
    }
  },
  methods: {
    expiredMethod() {
      this.recaptcha_response = ''
      this.$refs.recaptcha.reset()
    },
    errorMethod() {
      this.recaptcha_response = ''
      this.$refs.recaptcha.reset()
    },
    async verifyMethod(response) {
      this.recaptcha_response = await response
    },
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
        const response = await UserRegister.store({
          username: this.username,
          email: this.email,
          password: this.password,
          recaptcha: this.recaptcha_response,
        })
        this.dialog = false
        this.sending = false
        this.api_error = ''
        this.$auth.setUserToken(response.auth_token)
        this.$router.push('/user/home')
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
      <template #activator="{ props }">
        <v-btn
          color="purple"
          v-bind="props"
        >
          <span ml-2 text-l>Register</span>
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
          ref="form"
        >
          <div :class="{ 'text-red': v$.username.$errors.length }">
            <v-text-field
              v-model="username"
              type="username"
              label="username"
            />
            <div v-for="error of v$.username.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <div :class="{ 'text-red': v$.email.$errors.length }">
            <v-text-field
              v-model="email"
              type="email"
              label="email"
            />
            <div v-for="error of v$.email.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <div :class="{ 'text-red': v$.password.$errors.length }">
            <v-text-field
              v-model="password"
              type="password"
              label="password"
            />
            <div v-for="error of v$.password.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <Dialog
            message="This web application is a personal project for non profit.<br>
          No personal data is collected.<br>
          The service could be interrupted without advice.<br>
          Right reserved for deleting illegal content and user accounts.<br>
          "
            :show="show_terms"
          />
          <div @click="show_terms = !show_terms">
            Service conditions
          </div>
          <div :class="{ 'text-red': v$.terms.$errors.length }">
            <v-checkbox v-model="terms" label="Accept service's conditions" />
            <div v-for="error of v$.terms.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <div :class="{ 'text-red': v$.recaptcha_response.$errors.length }">
            <VueRecaptcha
              ref="recaptcha"
              :theme="useColorMode().value"
              sitekey="6LeqW2EjAAAAAHUbSZ8sfh9JhehxD_xDlPWdz6cJ"
              @verify="verifyMethod"
              @expired="expiredMethod"
              @error="errorMethod"
            />
            <div v-for="error of v$.recaptcha_response.$errors" :key="error.$uid" class="input-errors">
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div>
            <v-btn @click="expiredMethod">
              Reload recaptcha
            </v-btn>
          </div>
          <v-btn
            color="purple"
            class="m-3"
            :disabled="sending"
            @click="submitForm"
          >
            Register
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
