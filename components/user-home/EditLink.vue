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
      dialog: false,
      id: '',
      link_url: '',
      link_description: '',
      link_public: false,
      api_error: '',
      sending: false,
      categories: {},
      category_selected: {},
      color_changing: 0,
      myPolling: null,
    })
  },
  validations() {
    return {
      link_url: { required },
    }
  },
  mounted() {
    this.categories = useCategoryStore().categories
    this.id = this.record.id
    this.link_url = this.record.url
    this.link_description = this.record.description
    this.category_selected = this.record.category
    this.link_public = this.record.public
    this.myPolling = setInterval(async () => {
      this.color_changing++
    }, 1000 / 4)
  },
  beforeUnmount() {
    window.clearInterval(this.myPolling)
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
            url_string: this.link_url,
            description: this.link_description,
            category: this.category_selected ? this.category_selected.id : '',
            public: this.link_public,
          },
          token: user.token,
        })

        this.sending = this.dialog = false
        this.$emit('update', { url: this.link_url })
        this.link_url = this.link_description = this.category_selected = ''
        this.v$.$reset()
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
  >
    <template #activator="{ props }">
      <v-btn
        color="cyan"
        v-bind="props"
      >
        <v-icon icon="i-line-md:edit" />
        &nbsp;Edit link
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
        <div :class="{ 'text-red': v$.link_url.$errors.length }">
          <v-textarea
            v-model="link_url"
            auto-grow="true"
            type="url"
            label="url (required)"
            density="compact"
          />
          <div v-for="error of v$.link_url.$errors" :key="error.$uid" class="input-errors">
            <div class="error-msg">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <v-textarea
          v-model="link_description"
          type="string"
          auto-grow="true"
          label="your description is always private"
          density="compact"
          color="blue-grey"
        />

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
            color="deep-orange"
          />
        </div>

        <div>
          <v-checkbox
            v-model="link_public"
            density="compact"
            class="mt-5"
            label="Public visibility (to show on discover section)"
            :style="`color:${color_return(color_changing)}`"
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

