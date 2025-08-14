<template>
  <v-container>
    <h2 class="text-center my-5">スケジュール一覧</h2>

    <v-data-table
      :headers="headers"
      :items="events"
      class="elevation-1"
    ></v-data-table>

    
<v-row justify="center" class="mt-4">
    <v-col cols="auto">
      <v-btn rounded
      color= #7fbfff 
      large
      @click="$router.push('/purchase')">
        イベントを追加する
      </v-btn>
      
    </v-col>
  </v-row>
</v-container>

</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'ID' },
        { text: 'タイトル', value: 'Title' },
        { text: '日付', value: 'Date' },
        { text: '場所', value: 'Location' },
      ],
    }
  },
  computed: {
    events() {
      return this.$store.getters['product/getData']
    }
  },
  created() {
    this.$store.dispatch('product/fetchData')
  }
}
</script>
