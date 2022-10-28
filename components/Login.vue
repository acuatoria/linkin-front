<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return ({
      response: {},
      user: useUserStore(),
      dialog: false,
      username: '',
      password: '',
      api_error: '',
      sending: false,
    })
  },
  validations() {
    return {
      username: { required },
      password: { required },
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
        this.response = await login({
          username: this.username, password: this.password,
        })

        this.user.token = this.response.token
        this.user.isLogged = true
        this.dialog = false
        this.sending = false
        this.api_error = ''
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
  <v-dialog
    v-model="dialog"
    scroll-strategy="close"
    text-center
  >
    <template #activator="{ props }">
      <v-btn

        color="primary"
        v-bind="props"
      >
        <v-icon icon="i-line-md:account" />
        Sign in
      </v-btn>
    </template>

    <v-card m-auto>
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

        <v-btn
          color="primary"
          class="mr-4"
          :disabled="sending"
          @click="submitForm"
        >
          Sign In
          <v-icon v-show="sending" icon="i-line-md:loading-alt-loop" />
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
div{
  min-width: 315px;
}
</style>
