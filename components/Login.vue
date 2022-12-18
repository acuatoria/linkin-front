<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup() {
    return { v_login: useVuelidate() }
  },
  data() {
    return ({
      response: {},
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
      const isFormCorrect = await this.v_login.$validate()
      if (!isFormCorrect)
        return
      this.api_error = ''
      this.sending = true
      this.submit()
    },
    async submit() {
      try {
        await useNuxtApp().$auth.loginWith('local', {
          body:
            {
              username: this.username, password: this.password,
            },
        })
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
  <div>
    <v-alert
      v-if="api_error"
      prominent
      type="error"
      variant="outlined"
    >
      {{ api_error }}
    </v-alert>
    <v-form
      ref="form_login"
    >
      <div :class="{ 'text-red': v_login.username.$errors.length }">
        <v-text-field
          v-model="username"
          type="username"
          label="username"
        />
        <div v-for="error of v_login.username.$errors" :key="error.$uid" class="input-errors">
          <div class="error-msg">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <div :class="{ 'text-red': v_login.password.$errors.length }">
        <v-text-field
          v-model="password"
          type="password"
          label="password"
        />
        <div v-for="error of v_login.password.$errors" :key="error.$uid" class="input-errors">
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
        Sign In
        <v-icon v-show="sending" icon="i-line-md:loading-alt-loop" />
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped>
.modal{
  min-width: 270px;
}
</style>
