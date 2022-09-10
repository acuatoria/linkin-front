export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore()
  if (user.isLogged && from.path === '/' && to.path === '/')
    return navigateTo('/user/home')
})
