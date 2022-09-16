<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  props: ['record'],
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
      id: '',
      description: '',
      api_error: '',
      sending: false,
      categories: {},
      category_selected: {},
    })
  },
  validations() {
    return {
      url: { required },
    }
  },
  mounted() {
    this.categories = useCategoryStore().categories.results
    this.id = this.record.id
    this.url = this.record.url
    this.description = this.record.description
    this.category_selected = this.record.category
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
        this.response = await UserLink.update({
          data: {
            id: this.id,
            url_string: this.url,
            description: this.description,
            category: this.category_selected ? this.category_selected.id : '',
          },
          token: user.token,
        })

        this.sending = this.dialog = false
        this.url = this.description = this.category_selected = ''
        this.$emit('update')
        this.v$.$reset()
      }
      catch (error) {
        const errore = await error
        if (errore.status === 500)
          this.api_error = 'Server error'
        else
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

        color="secondary"
        v-bind="props"
      >
        <v-icon icon="i-line-md:edit" />
        Edit link
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
        <v-text-field
          v-model="description"
          type="string"
          label="description"
        />

        <div :class="{ 'text-red': v$.url.$errors.length }">
          <v-text-field
            v-model="url"
            type="url"
            label="url"
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
            dense
            return-object
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
      min-width: 250px;
    }
    </style>

