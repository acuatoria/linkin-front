export const CommentCount = {
  userlink_endpoint() { return `${useRuntimeConfig().API_BASE_URL}api/v1/comments-count/` },
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
}
