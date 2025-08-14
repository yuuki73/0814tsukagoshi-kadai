import axios from 'axios'

export default {
  namespaced: true,

  state: () => ({
    Data: []
  }),

  getters: {
    getData: (state) => state.Data
  },

  mutations: {
    setData(state, event) {
      state.Data = event
    }
  },

  actions: {
    async fetchData({ commit }) {
        const resp = await axios.get(
          'https://m3h-tsukagoshi-0804-gvemc6hvcpbcafa6.japaneast-01.azurewebsites.net/api/SELECT'
        )
        commit('setData', resp.data.List) 
    }
  }
  
}

