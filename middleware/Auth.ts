export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore()
  if (user && !user.isLogged)
    return navigateTo('/')
})
