export const login = (data: object) => {
  $fetch('/api-token-auth/', {
    baseURL: useRuntimeConfig().API_BASE_URL,
    method: 'POST', // Post method works
    body: {
      username: data.username, password: data.password,
    },
  })
}

