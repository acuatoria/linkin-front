export const UserLinks = {
  index(token: string) {
    return fetch(`${useRuntimeConfig().API_BASE_URL}api/v1/url-user/`, {
      method: 'GET',
      headers: { Authorization: 'token' + ` ${token}` },
    }).then((response) => {
      if (response.status !== 200)
        throw response.status
      else
        return response.json()
    })
  },

  store(data: object) {
    return fetch(`${useRuntimeConfig().API_BASE_URL}api/v1/url-user/`, {
      method: 'POST',
      body: JSON.stringify(data.data),
      headers: {
        'Authorization': 'token' + ` ${data.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then((response) => {
      if (response.status !== 201)
        throw response.json()
      else
        return response.json()
    })
  },

  delete(data: object) {
    return fetch(`${useRuntimeConfig().API_BASE_URL}api/v1/url-user/${data.id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'token' + ` ${data.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then((response) => {
      if (response.status !== 204)
        throw response.json()
      else
        return 'ok'
    })
  },
}
