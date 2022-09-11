export const Category = {
  index(token: string) {
    return fetch(`${useRuntimeConfig().API_BASE_URL}api/v1/category/`, {
      method: 'GET',
      headers: { Authorization: 'token' + ` ${token}` },
    }).then((response) => {
      if (response.status !== 200)
        throw response.status
      else
        return response.json()
    })
  },
}
