<template>
  <v-container>

    <!-- 検索フォーム -->
    <v-card class="pa-4 mb-6 elevation-3" color="#fff8e1" >
      <v-card-title class="text-h6 font-weight-bold orange--text">
        <v-icon left color="orange">mdi-magnify</v-icon> お店を探す
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              v-model="budget"
              :items="budgets"
              item-text="label"
              item-value="value"
              label="💴 予算"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="station"
              :items="stations"
              label="🚉 駅名"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="genre"
              :items="genres"
              label="🍴 ジャンル"
              outlined
              dense
            />
          </v-col>
        </v-row>
        <v-btn
          color="orange darken-2"
          block
          large
          class="rounded-pill white--text mt-3"
          @click="searchRestaurants"
        >
          <v-icon left>mdi-magnify</v-icon> 検索
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- 検索結果表示 -->
    <div v-if="restaurants.length">
      <v-row>
        <v-col v-for="r in restaurants" :key="r.ID" cols="12" sm="6" md="4">
          <v-card class="mx-auto my-4 shadow-lg rounded-xl" max-width="400">

            <!-- ジャンルごとの店舗写真 -->
            <v-img :src="genreImages[r.Genre] || genreImages['default']" height="200px" contain></v-img>

            <v-card-title class="text-h6 font-weight-bold orange--text">
              {{ r.Name }}
            </v-card-title>

            <v-card-subtitle>
              <v-chip small color="deep-orange lighten-4" class="mr-1">{{ r.Genre }}</v-chip>
              <v-chip small color="blue lighten-4">{{ r.Station }}</v-chip>
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

            <!-- お気に入りハートボタン-->
            <v-card-actions class="d-flex justify-center">
              <v-btn icon size="large" :style="{ color: '#f48fb1' }" @click="addFavorite(r.ID)">
                <v-icon size="28">mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else class="mt-4 text-center">
      該当するお店が見つかりません
    </div>

    <div style="display: flex; align-items: flex-start; gap: 20px; margin-top: 24px;">
    <!-- AIボタン -->
    <v-btn v-if="restaurants.length" color="orange darken-2"  class="rounded-pill px-6 white--text" @click="askAI">
      選んでAI！
    </v-btn>

    <v-card v-if="aiResult" class="pa-4 elevation-3" max-width="600" outlined color="#fff8e1">
  <v-card-title class="font-weight-bold orange--text">
    おすすめのお店
  </v-card-title>
  <v-card-subtitle>{{ aiResult.BestMatch.Name }}</v-card-subtitle>
  <v-card-text>
    <div>理由: {{ aiResult.Reason }}</div>
  </v-card-text>
</v-card>
</div>

  </v-container>
</template>

<script>
import axios from "axios"
import { mapState, mapActions } from "vuex"

export default {
  name: "SearchView",
  data() {
    return {
      budget: null,
      station: "",
      genre: "",
      userId: null,
      budgets: [
        { label: "500円", value: 500 },
        { label: "1000円", value: 1000 },
        { label: "2000円", value: 2000 },
        { label: "3000円", value: 3000 },
        { label: "4000円", value: 4000 },
        { label: "5000円", value: 5000 }
      ],
      stations: ["渋谷駅", "新宿駅", "池袋駅", "品川駅", "東京駅"],
      genres: ["ラーメン", "イタリアン", "焼肉", "和食", "寿司", "居酒屋","フレンチ","カフェ","中華料理","カレー"],
      aiResult: null,

      // ジャンルごとの画像を表示
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

 created() {
    this.userId = localStorage.getItem("userId") // ← ここでも取り出す
  },

  computed: {
    ...mapState("restaurant", ["restaurants"])
  },

  methods: {
    ...mapActions("restaurant", ["searchData", "chooseRestaurant","addFavorite"]),

    async searchRestaurants() {
      // 前のAI結果をクリア
      this.aiResult = null 

      await this.searchData({
        budget: this.budget ? Number(this.budget) : null, // 
        station: this.station,
        genre: this.genre
      })
    },

    async askAI() {
    const resp = await this.chooseRestaurant({
    budget: this.budget,
    station: this.station,
    genre: this.genre
  })
    const text = resp.Content[0].Text
    this.aiResult = JSON.parse(text)
},

//一覧画面と同じお気に入り登録処理を追加
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
  }


  }
}

</script>

