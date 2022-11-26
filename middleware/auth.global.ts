export default defineNuxtRouteMiddleware(async (to) => {
  const { $auth } = useNuxtApp()
  const loggedIn = $auth.loggedIn
})
