export const ResetPassword = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/reset-password/` },
  headers() {
    return {
      'Authorization': `${useNuxtApp().$auth.$storage.getCookie('_token.local')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },

  validate_token(token: string) {
    return $fetch(`${this.userlink_endpoint()}token-validation/?token=${token}`, {
      method: 'GET',
      headers: this.headers(),
    })
  },

  email_reset_password(data: object) {
    return $fetch(this.userlink_endpoint(), {
      method: 'POST',
      body: JSON.stringify(data.data),
      headers: this.headers(),
    })
  },

  reset_password(data: object, token: string) {
    return $fetch(`${this.userlink_endpoint()}submit/?token=${token}`, {
      method: 'POST',
      body: JSON.stringify(data.data),
      headers: this.headers(),
    })
  },
}

