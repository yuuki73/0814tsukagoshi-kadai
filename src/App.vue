<template>
  <v-app>
     
      <v-app-bar app color="white" elevation="2">
      <v-toolbar-title class="font-weight-bold">
      <v-icon left color="orange">mdi-silverware-fork-knife</v-icon>
        GurumeApp
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text to="/">一覧</v-btn>
      <v-btn text to="/favorites">お気に入り</v-btn>
      <v-btn text to="/search">条件検索</v-btn>

     <!-- ログイン中のとき -->
      <template v-if="userName">
        <v-btn text color="red" @click="logout">ログアウト</v-btn>
        <v-icon left color="orange">mdi-account-circle</v-icon>
         <span class="mr-3" style="font-size: 14px; font-weight: 500;">ログイン中: {{ userName }}</span>
      </template>

      <!-- 未ログインのとき -->
      <template v-else>
        <v-btn text to="/login">ログイン</v-btn>
      </template>
    </v-app-bar>

    <!-- コンテンツ部分 -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    userName: null,
    userId: null,
  }),
  created() {
    // ページ読み込み時に localStorage から復元
    this.userId = localStorage.getItem("userId")
    this.userName = localStorage.getItem("userName")
  },
  methods: {
    logout() {
      // localStorage の値を削除
      localStorage.removeItem("userId")
      localStorage.removeItem("userName")

      // データをリセット
      this.userId = null
      this.userName = null

      alert("ログアウトしました")
      this.$router.replace("/login")
    },
  },
}
</script>

<style>
.main-background {
  background-color: #ffffff;
}
</style>
