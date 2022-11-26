export const Url = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/urls/` },
  headers() {
    return {
      'Authorization': `${useNuxtApp().$auth.$storage.getCookie('_token.local')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  get(url: string) {
    return $fetch(`${this.userlink_endpoint()}${url}/`, {
      method: 'GET',
      headers: this.headers(),
    })
  },
  discover(page: Number, query: string, category_search: Number) {
    return $fetch(`${this.userlink_endpoint()}?page=${page}&query=${query}&category_search=${category_search}`, {
      method: 'GET',
      headers: this.headers(),
    })
  },
}
