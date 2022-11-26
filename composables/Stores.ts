import { defineStore, skipHydrate } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref(useLocalStorage('categories', {}))
  return {
    categories: skipHydrate(categories),
  }
})
export const useCollectionStore = defineStore('collection', () => {
  const collections = ref(useLocalStorage('collections', {}))
  return {
    collections: skipHydrate(collections),
  }
})

