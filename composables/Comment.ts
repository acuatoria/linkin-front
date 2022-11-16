export const Comment = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/comments/` },
  headers(token: string) {
    return {
      'Authorization': token ? 'token' + ` ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  index(token: string, url: string) {
    return $fetch(`${this.userlink_endpoint()}${url}/`, {
      method: 'GET',
      headers: this.headers(token),
    })
  },
  get(token: string, url: string) {
    return $fetch(`${this.userlink_endpoint()}?url=${url}`, {
      method: 'GET',
      headers: this.headers(token),
    })
  },
  create(token: string, data: object) {
    return $fetch(`${this.userlink_endpoint()}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.headers(token),
    })
  },
  delete(token: string, url: string) {
    return $fetch(`${this.userlink_endpoint()}${url}/`, {
      method: 'DELETE',
      headers: this.headers(token),
    })
  },
}
