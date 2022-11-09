export const Category = {
  headers(token: string) {
    return {
      'Authorization': token ? 'token' + ` ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  index(token: string) {
    return fetch(`${useRuntimeConfig().API_BASE_URL}api/v1/category/`, {
      method: 'GET',
      headers: this.headers(token),
    }).then((response) => {
      if (response.status !== 200)
        throw response.status
      else
        return response.json()
    })
  },
}
