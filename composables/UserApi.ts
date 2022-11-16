export const login = (data: object) => {
  return $fetch('/api-token-auth/', {
    baseURL: useRuntimeConfig().public.API_BASE_URL,
    method: 'POST',
    body: data,
  })
}

export const logout_user = (token: string) => {
  return $fetch('/api-auth/logout/', {
    baseURL: useRuntimeConfig().public.API_BASE_URL,
    method: 'GET',
    headers: { Authorization: 'token' + ` ${token}` },
  })
}
