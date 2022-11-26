export const CommentCount = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/comments-count/` },
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
}
