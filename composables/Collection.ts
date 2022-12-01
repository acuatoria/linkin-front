export const Collection = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/collection/` },
  headers() {
    return {
      'Authorization': `${useNuxtApp().$auth.$storage.getCookie('_token.local')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  get(id: string) {
    return $fetch(`${this.userlink_endpoint()}${id}/`, {
      method: 'GET',
      headers: this.headers(),
    })
  },
  items(id: string, page: Number, query: string, category_search: Number) {
    return $fetch(`${useRuntimeConfig().public.API_BASE_URL}api/v1/urluser-min/?collection=${id}&page=${page}&query=${query}&category_search=${category_search}`, {
      method: 'GET',
      headers: this.headers(),
    })
  },
  index() {
    return $fetch(`${this.userlink_endpoint()}`, {
      method: 'GET',
      headers: this.headers(),
    })
  },

  store(data: object) {
    return $fetch(this.userlink_endpoint(), {
      method: 'POST',
      body: JSON.stringify(data.data),
      headers: this.headers(),
    })
  },

  update(data: object) {
    return $fetch(`${this.userlink_endpoint()}${data.data.id}/`, {
      method: 'PUT',
      body: JSON.stringify(data.data),
      headers: this.headers(),
    })
  },

  delete(data: object) {
    return $fetch(`${this.userlink_endpoint()}${data.id}/`, {
      method: 'DELETE',
      headers: this.headers(),
    })
  },
}
