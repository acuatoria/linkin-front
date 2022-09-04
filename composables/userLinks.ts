export const UserLinks = {
  index(token) {
    return fetch(`${useRuntimeConfig().API_BASE_URL}/api/v1/url-user/`, {
      method: 'GET',
      headers: { Authorization: 'token' + ` ${token}` },
    }).then((response) => {
      if (response.status !== 200)
        throw response.status

      else
        return response.json()
    })
  },

  store(data) {

  },

}
