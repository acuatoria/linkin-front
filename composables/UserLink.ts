export const UserLink = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/url-user/` },
  headers(token: string) {
    return {
      'Authorization': token ? `token ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  index(token: string, page: Number, query: string, category_search: Number) {
    return $fetch(`${this.userlink_endpoint()}?page=${page}&query=${query}&category_search=${category_search}`, {
      method: 'GET',
      headers: this.headers(token),
    })
  },

  store(data: object) {
    return $fetch(this.userlink_endpoint(), {
      method: 'POST',
      body: JSON.stringify(data.data),
      headers: this.headers(data.token),
    })
  },

  update(data: object) {
    return $fetch(`${this.userlink_endpoint()}${data.data.id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data.data),
      headers: this.headers(data.token),
    })
  },

  delete(data: object) {
    return $fetch(`${this.userlink_endpoint()}${data.id}/`, {
      method: 'DELETE',
      headers: this.headers(data.token),
    })
  },
}
