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
      url: '',
      description: '',
      api_error: '',
      link_public: false,
      sending: false,
      categories: {},
      category_selected: '',
    })
  },
  validations() {
    return {
      url: { required },
    }
  },
  mounted() {
    this.categories = useCategoryStore().categories
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
        this.response = await UserLink.store({
          data: {
            url_string: this.url,
            description: this.description,
            category: this.category_selected.id,
            public: this.link_public,
          },
          token: user.token,
        })

        this.sending = this.dialog = false
        this.url = this.description = this.category_selected = ''
        this.$emit('update')
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
      <v-btn
        color="deep-purple"
        v-bind="props"
      >
        <v-icon
          m-auto
          icon="i-line-md:external-link"
        />
        &nbsp;Add link
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
      >
        <v-textarea
          v-model="description"
          type="string"
          auto-grow="true"
          label="description"
          density="compact"
        />

        <div :class="{ 'text-red': v$.url.$errors.length }">
          <v-textarea
            v-model="url"
            auto-grow="true"
            type="url"
            label="url (required)"
            density="compact"
          />
          <div v-for="error of v$.url.$errors" :key="error.$uid" class="input-errors">
            <div class="error-msg">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="categories">
          <v-select
            v-model="category_selected"
            :items="categories"
            item-title="name"
            item-value="id"
            return-object
            :clearable="true"
            density="compact"
            class="mt-5"
            label="Category"
          />
        </div>

        <div>
          <v-checkbox
            v-model="link_public"
            density="compact"
            class="mt-5"
            label="Public visibility"
          />
        </div>
        <v-btn
          color="primary"
          class="mr-4"
          :disabled="sending"
          @click="submitForm"
        >
          Save
          <v-icon v-show="sending" icon="i-line-md:loading-alt-loop" />
        </v-btn>
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
