export const UserLink = {
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
      if (response.ok)
        return response.json()

      throw response.json()
    })
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        throw error
      })
  },

  update(data: object) {
    return fetch(`${useRuntimeConfig().API_BASE_URL}api/v1/url-user/${data.data.id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data.data),
      headers: {
        'Authorization': 'token' + ` ${data.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then((response) => {
      if (response.ok)
        return response.json()

      throw response.json()
    })
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        throw error
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
      if (response.ok)
        return response.json()

      throw response.json()
    })
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        throw error
      })
  },
}
