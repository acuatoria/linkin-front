<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  emits: ['update'],
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return ({
      response: {},
      user: useUserStore(),
      dialog: false,
      name: '',
      description: '',
      api_error: '',
      is_public: false,
      sending: false,
    })
  },
  validations() {
    return {
      name: { required },
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
      const user = useUserStore()
      try {
        this.response = await Collection.store({
          data: {
            name: this.name,
            description: this.description,
            public: this.is_public,
          },
          token: user.token,
        })
        this.sending = this.dialog = false
        this.$emit('update')
        this.name = this.description = ''
        this.v$.$reset()
      }
      catch (error) {
        this.api_error = 'Server error'

        try {
          const error_msg = await error
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
  >
    <template #activator="{ props }">
      <v-responsive
        class="mx-auto"
        max-width="150"
      >
        <v-btn
          color="green"
          v-bind="props"
        >
          Add Collection
        </v-btn>
      </v-responsive>
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
      >
        <div :class="{ 'text-red': v$.name.$errors.length }">
          <v-textarea
            v-model="name"
            auto-grow="true"
            type="name"
            label="name (required)"
            density="compact"
          />
          <div v-for="error of v$.name.$errors" :key="error.$uid" class="input-errors">
            <div class="error-msg">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <v-textarea
          v-model="description"
          type="string"
          auto-grow="true"
          label="Collection description"
          density="compact"
          color="blue-grey"
        />

        <div>
          <v-checkbox
            v-model="is_public"
            density="compact"
            class="mt-5"
            label="Shareable collection"
            :style="`color:${color_return(color_changing)}`"
          />
        </div>
        <div flex m-2>
          <v-btn
            color="orange"
            m-auto
            :disabled="sending"
            @click="submitForm"
          >
            Save
            <v-icon v-show="sending" icon="i-line-md:loading-alt-loop" />
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .alert_form{
    width: 90%;
    max-width: 600px;
    margin: auto;
  }
</style>
