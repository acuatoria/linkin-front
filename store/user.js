export const state = () => ({
  list: [],
})

export const mutations = {
  add(state, user) {
    state.list.push(user)
  },
  remove(state, { user }) {
    state.list.splice(state.list.indexOf(user), 1)
  },
}
