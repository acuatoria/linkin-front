export const UserRegister = {
  userlink_endpoint() { return `${useRuntimeConfig().public.API_BASE_URL}api/v1/users/` },
  headers() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  store(data: object) {
    return $fetch(this.userlink_endpoint(), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this.headers(),
    })
  },
}
