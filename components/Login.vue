<script>
export default {
  data() {
    return ({
      usuario: {},
      response: {},
      valid: false,
      dialog: false,
      form: {},
      username: '',
      nameRules: [
        v => !!v || 'Username is required',
      ],
      password: '',
      passRules: [
        v => !!v || 'Password is required',
      ],
    })
  },
  watch: {
    response() {
      const user = useUserStore()
      user.token = this.response.token
      user.isLogged = true
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async submit() {
      try {
        this.response = await $fetch('/api-token-auth/', {
          baseURL: useRuntimeConfig().API_BASE_URL,
          method: 'POST', // Post method works
          body: {
            username: this.username, password: this.password,
          },
        })
      }
      catch (error) {
        this.answer = `Error! Could not reach the API. ${error}`
      }
    },
  },
}
</script>

<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
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

      <v-card width="50vh">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            label="username"
            required
            :rules="nameRules"
          />

          <v-text-field
            v-model="password"
            type="password"
            label="password"
            :rules="passRules"
            required
          />

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="submit"
          >
            Sig In
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
