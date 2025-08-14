<template>
  <v-app>
    <v-app-bar app color= #93c9ff>
      <div class="d-flex align-center">  
      </div>
 
      <v-spacer></v-spacer>
                <v-btn text to="/" tag="router-link">一覧</v-btn>
      <!-- 今回は不要 -->
      <!-- <v-btn text to="/about" tag="router-link">About</v-btn> -->
      <v-btn text to="/purchase" tag="router-link">追加</v-btn> 

      <!-- 今回は不要 -->
      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      > -->
        <!-- <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>
 
    <v-main class="main-background">
  <router-view/>
</v-main>
  </v-app>
</template>
 
<script>
 
export default {
  name: 'App',
 
  data: () => ({
    //
  }),
};
</script>

<style>
.main-background {
  background-color: #ffffff;
}
</style>
