export const Comment = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/comments/` },
  headers() {
    return {
      'Authorization': `${useNuxtApp().$auth.$storage.getCookie('_token.local')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  index(url: string) {
    return $fetch(`${this.userlink_endpoint()}${url}/`, {
      method: 'GET',
      headers: this.headers(),
    })
  },
  get(url: string) {
    return $fetch(`${this.userlink_endpoint()}?url=${url}`, {
      method: 'GET',
      headers: this.headers(),
    })
  },
  create(data: object) {
    return $fetch(`${this.userlink_endpoint()}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.headers(),
    })
  },
  delete(url: string) {
    return $fetch(`${this.userlink_endpoint()}${url}/`, {
      method: 'DELETE',
      headers: this.headers(),
    })
  },
}
