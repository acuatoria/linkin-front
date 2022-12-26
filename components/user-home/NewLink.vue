<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  props: ['collection'],
  emits: ['update'],
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return ({
      response: {},
      dialog: false,
      url: '',
      description: '',
      api_error: '',
      link_public: false,
      sending: false,
      categories: {},
      category_selected: '',
      collections: [],
      collections_selected: [],
      color_changing: 0,
      myPolling: null,
    })
  },
  validations() {
    return {
      url: { required },
    }
  },
  mounted() {
    this.categories = useCategoryStore().categories
    this.collections = useCollectionStore().collections
    if (this.collection)
      this.collections_selected.push(this.collections.find(item => item.id === this.collection))
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
      try {
        this.response = await UserLink.store({
          data: {
            url_string: this.url,
            description: this.description,
            category: this.category_selected.id,
            public: this.link_public,
            collection: this.collections_selected,
          },
        })

        this.sending = this.dialog = false
        this.$emit('update', { url: this.url })
        this.url = this.description = this.category_selected = ''
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
        color="orange"
        v-bind="props"
      >
        <span v-if="collection">
          Add link to collection
        </span>
        <span v-else>
          Add link
        </span>
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
        <div :class="{ 'text-red': v$.url.$errors.length }">
          <v-textarea
            v-model="url"
            auto-grow
            type="url"
            label="url (required)"
            placeholder="https://xxxxxx.xxx"
            density="compact"
          />
          <div v-for="error of v$.url.$errors" :key="error.$uid" class="input-errors">
            <div class="error-msg">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <v-textarea
          v-model="description"
          type="string"
          auto-grow
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

        <div class="collections">
          <v-select
            v-model="collections_selected"
            :items="collections"
            multiple
            item-title="name"
            item-value="id"
            return-object
            :clearable="true"
            density="compact"
            class="mt-5"
            label="Collections"
          />
        </div>

        <div>
          <v-checkbox
            v-model="link_public"
            density="compact"
            class="mt-5"
            label="Public visibility (to discover section)"
            :style="`color:${color_return(color_changing)}`"
          />
        </div>
        <div flex mb-5>
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
