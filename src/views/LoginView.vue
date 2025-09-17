<template>
  <v-container>
    <h2 class="text-center my-5">ログイン</h2>
    <v-card class="pa-4 mx-auto" max-width="400">
      <v-text-field
        v-model="name"
        label="ユーザー名"
        outlined dense
      />
      <v-text-field
        v-model="password"
        label="パスワード"
        outlined dense
      />
      <v-btn
        color="orange darken-2"
        block
        class="mt-3 white--text"
        @click="login"
      >
        ログイン
      </v-btn>

      <div v-if="message" class="mt-3 text-center">{{ message }}</div>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      name: "",
      password: "",
      message: ""
    }
  },
  methods: {
    async login() {
      try {
        const resp = await axios.post(
          "https://m3h-tsukagoshi-20250825-dgeud9ejhjdnf9aj.japaneast-01.azurewebsites.net/api/login?",  
          {
            name: this.name,
            password: this.password
          }
        )
        this.message = resp.data
        // 成功したら userId を取り出す
        if (resp.data.includes("ログイン成功")) {
          const userId = resp.data.split("=")[1]
          localStorage.setItem("userId", userId.trim())
          localStorage.setItem("userName", this.name)

          this.$router.push("/")
          //this.message = `${this.name} さんがログインしました`
          location.reload()
          
        }
      } catch (err) {
        this.message = "ログイン失敗"
      }
    }
  }
}
</script>
