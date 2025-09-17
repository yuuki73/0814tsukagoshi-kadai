<template>
  <v-container>
    <h2 class="text-center my-5 font-weight-bold">レストラン一覧</h2>

    <v-row>
      <v-col
        v-for="r in restaurants"
        :key="r.ID"
        cols="12" sm="6" md="4"
      >
        <v-card class="mx-auto my-4 shadow-lg rounded-xl" max-width="400">

          <!-- 🍜 ジャンルごとの画像 -->
          <v-img
            :src="genreImages[r.Genre] || genreImages['default']"
            height="200px"
            contain
          ></v-img>

          <v-card-title class="text-h6 font-weight-bold">
            {{ r.Name }}
          </v-card-title>
          <v-card-subtitle class="grey--text">
            {{ r.Genre }} ｜ {{ r.Station }}
          </v-card-subtitle>

          <v-card-text>
            <div class="mb-1">
              <v-icon small class="mr-1">mdi-currency-jpy</v-icon>
              予算: ¥{{ r.Budget }}
            </div>
            <div>
              <v-icon small class="mr-1">mdi-silverware-fork-knife</v-icon>
              {{ r.Feature }}
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <!-- お気に入りハートボタン（中央配置・アイコンのみ） -->
          <v-card-actions class="d-flex justify-center">
            <v-btn
              icon
              size="large"
              :style="{ color: '#f48fb1' }"
              @click="addFavorite(r.ID)"
            >
              <v-icon size="28">mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
import { mapActions } from "vuex"

export default {
  name: "RestaurantList",
  data() {
    return {
      aiResult: null,
      userId: null,   

    // ✅ ジャンルごとの画像
      genreImages: {
        "ラーメン": "/images/food_ramen.png",
        "寿司": "/images/food_sushi.png",
        "イタリアン": "/images/food_italian.png",
        "焼肉": "/images/food_yakiniku.png",
        "カフェ": "/images/food_cafe.png",
        "居酒屋": "/images/food_izakaya.png",
        "フレンチ": "/images/food_french.png",
        "中華料理": "/images/food_chuuka.png",
        "カレー": "/images/food_curry.jfif",
        "和食": "/images/food_washoku.jfif",
        "default": "/images/food_default.png"
      }

    }
  },
  computed: {
    restaurants() {
      return this.$store.getters['restaurant/getRestaurants']
    }
  },
  created() {
    this.$store.dispatch('restaurant/fetchData')
    this.userId = localStorage.getItem("userId") // ← ログイン時に保存したIDを取得
  },
  methods: {
    ...mapActions("restaurant", ["chooseRestaurant"]),

    addFavorite(restaurantId) {
      axios.post(
        "https://m3h-tsukagoshi-20250825-dgeud9ejhjdnf9aj.japaneast-01.azurewebsites.net/api/favorite/insert?",
        {
          UserId: this.userId,
          RestaurantId: restaurantId
        }
      )
      .then(() => {
        alert("お気に入りに登録しました")
      })
      .catch(err => {
        console.error("お気に入り登録エラー:", err)
      })
    },
    async askAI() {
      this.aiResult = await this.chooseRestaurant()
    }
  }
}
</script>
