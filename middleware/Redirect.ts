export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore()
  if (user && user.isLogged && from.path === '/' && to.path === '/')
    return navigateTo('/user/home')
})
