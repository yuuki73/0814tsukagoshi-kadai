import axios from 'axios'

export default {
  namespaced: true,

  state: () => ({
    restaurants: [],   // レストラン一覧
    favorites: [] ,     // お気に入り一覧
  }),


  getters: {
    getRestaurants: (state) => state.restaurants,
    getFavorites: (state) => state.favorites
  },

  mutations: {
    setRestaurants(state, restaurants) {
      state.restaurants = restaurants
    },
    setFavorites(state, favorites) {
      state.favorites = favorites
    }
  },

  actions: {
    //レストラン一覧取得
    async fetchData({ commit }) {
      const resp = await axios.get(
        'https://m3h-tsukagoshi-20250825-dgeud9ejhjdnf9aj.japaneast-01.azurewebsites.net/api/restaurant/list?'
      )
      commit('setRestaurants', resp.data.List)
    },

    // 条件検索ページ用
    async searchData({ commit }, { budget, station, genre }) {
      const resp = await axios.post(
        'https://m3h-tsukagoshi-20250825-dgeud9ejhjdnf9aj.japaneast-01.azurewebsites.net/api/restaurant/search',
          { budget, station, genre }
      )
      commit('setRestaurants', resp.data.List)
      },

      //お気に入り追加
      async addFavorite({ dispatch }, restaurantId) {
      const userId = localStorage.getItem("userId")  // ← ログイン時のIDを取得

      await axios.post(
        "https://m3h-tsukagoshi-20250825-dgeud9ejhjdnf9aj.japaneast-01.azurewebsites.net/api/favorite/insert",
        { UserId: userId, RestaurantId: restaurantId }
      )

      // 追加後に最新の一覧を再取得（反映したい場合）
      await dispatch("fetchFavorites", { userId })
    },

      //お気に入り一覧取得
     async fetchFavorites({ commit }, { userId }) {
     const resp = await axios.post(
      "https://m3h-tsukagoshi-20250825-dgeud9ejhjdnf9aj.japaneast-01.azurewebsites.net/api/favorite/select",
      { UserId: userId }
     )
     commit("setFavorites", resp.data.List)
  },

      // AIにベストのレストランを選ばせる
      async chooseRestaurant({ state }, { budget, station, genre }) {
      const payload = { 
        candidates: state.restaurants,
        budget: budget,
        station: station,
        genre: genre
        }

      const resp = await axios.post(
        "https://m3h-tsukagoshi-aiapi0904-f0ckh0eddvagewbj.japaneast-01.azurewebsites.net/api/ai/choose",
        payload
        )

      return resp.data
        }
  }
}
