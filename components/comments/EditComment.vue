<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  props: ['userComment', 'url', 'label'],
  emits: ['update'],
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return ({
      response: {},
      dialog: false,
      comment: '',
      api_error: '',
      sending: false,
    })
  },
  validations() {
    return {
      comment: { required },
    }
  },
  mounted() {
    this.comment = this.userComment
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
        this.response = await Comment.create(
          {
            url: this.url,
            comment: this.comment,
            action: this.userComment ? 'update' : 'add',
          },
        )

        this.v$.$reset()
        this.sending = this.dialog = false
        this.$emit('update')
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
    scroll-strategy="reposition"
  >
    <template #activator="{ props }">
      <v-btn
        :color="label === 'Add a comment' ? 'orange' : 'cyan'"
        v-bind="props"
      >
        <v-icon icon="i-line-md:edit" />
        &nbsp;{{ label }}
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
        <div :class="{ 'text-red': v$.comment.$errors.length }">
          <v-textarea
            v-model="comment"
            outlined
            name="input-7-4"
            label="comment"
          />

          <div v-for="error of v$.comment.$errors" :key="error.$uid" class="input-errors">
            <div class="error-msg">
              {{ error.$message }}
            </div>
          </div>
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

