<script>
export default {
  props: ['userComment', 'url'],
  emits: ['update'],
  data() {
    return ({
      response: {},
      dialog: false,
      comment: '',
      api_error: '',
      sending: false,
    })
  },
  methods: {
    async submit() {
      const user = useUserStore()
      try {
        this.response = await Comment.delete(
          user.token,
          this.url,
        )
        this.sending = this.dialog = false
        this.$emit('update')
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
        v-bind="props"
        color="red"
      >
        <v-icon icon="i-line-md:remove" />
        &nbsp;Delete my comment
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

      <div flex flex-col h-100>
        <div m-auto>
          <span>
            Are you sure you want to delete your comment?
          </span>
        </div>
        <div m-auto>
          <v-btn
            color="primary"
            class="mr-4"
            :disabled="sending"
            @click="submit"
          >
            Yes
            <v-icon v-show="sending" icon="i-line-md:loading-alt-loop" />
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .alert_form{
    width: 90%;
    max-width: 600px;
    margin: auto;
    height:150px;
  }
</style>

