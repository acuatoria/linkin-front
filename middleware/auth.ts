export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore()
  if (!user.isLogged)
    return navigateTo('/')
})
