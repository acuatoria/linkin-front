export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUserStore()
  if (!user || !user.isLogged)
    return navigateTo('/')
})
