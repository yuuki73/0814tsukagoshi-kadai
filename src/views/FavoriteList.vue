<template>
  <v-container>
    <h2 class="text-center my-5">お気に入り一覧</h2>

    <v-row>
      <v-col
        v-for="r in favorites"
        :key="r.ID"
        cols="12" sm="6" md="4"
      >
        <v-card class="mx-auto my-3" max-width="400">
          <v-card-title>{{ r.Name }}</v-card-title>
          <v-card-subtitle>{{ r.Genre }} - {{ r.Station }}</v-card-subtitle>
          <v-card-text>
            <div>予算: ¥{{ r.Budget }}</div>
            <div>特徴: {{ r.Feature }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FavoriteList",
  computed: {
  favorites() {
  return this.$store.getters['restaurant/getFavorites']
  }
  },
created() {
  const userId = localStorage.getItem("userId")
  if (userId) {   // ← userId があるときだけ実行
  this.$store.dispatch('restaurant/fetchFavorites', { userId })
}
}
  }
</script>
