import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(useLocalStorage('token', ''))
  const isLogged = ref(useLocalStorage('isLogged', false))

  return {
    token,
    isLogged,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
