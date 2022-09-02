export const get_user_links = (token: string) => {
  return $fetch('/api/v1/url-user/', {
    baseURL: useRuntimeConfig().API_BASE_URL,
    method: 'GET',
    headers: { Authorization: 'token' + ` ${token}` },
  })
}

