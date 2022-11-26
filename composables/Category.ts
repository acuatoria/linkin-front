export const Category = {
  headers() {
    return {
      'Authorization': `${useNuxtApp().$auth.$storage.getCookie('_token.local')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  index() {
    return fetch(`${useRuntimeConfig().public.API_BASE_URL}api/v1/category/`, {
      method: 'GET',
      headers: this.headers(),
    }).then((response) => {
      if (response.status !== 200)
        throw response.status
      else
        return response.json()
    })
  },
}
