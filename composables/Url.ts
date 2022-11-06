export const Url = {
  userlink_endpoint() { return `${useRuntimeConfig().API_BASE_URL}api/v1/urls/` },
  headers(token: string) {
    return {
      'Authorization': token ? 'token' + ` ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  get(token: string, url: string) {
    return $fetch(`${this.userlink_endpoint()}${url}/`, {
      method: 'GET',
      headers: this.headers(token),
    })
  },
  discover(page: Number, query: string, category_search: Number) {
    return $fetch(`${this.userlink_endpoint()}?page=${page}&query=${query}&category_search=${category_search}`, {
      method: 'GET',
      headers: this.headers(''),
    })
  },
}
