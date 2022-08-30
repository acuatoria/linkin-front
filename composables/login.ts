export const login = (data: object) => {
  return $fetch('/api-token-auth/', {
    baseURL: useRuntimeConfig().API_BASE_URL,
    method: 'POST', // Post method works
    body: data,
  })
}

