<template>
  <v-container>
    <v-form @submit.prevent="addEvent">
      <v-text-field v-model="event.ID" label="ID" required></v-text-field>
      <v-text-field v-model="event.Title" label="タイトル" required></v-text-field>
      <v-text-field v-model="event.Location" label="場所" required></v-text-field>
      <v-text-field v-model="event.Date" label="日付 (YYYY-MM-DD)" required></v-text-field>

      <v-row justify="center" class="mt-4">
    <v-col cols="auto">
      <v-btn rounded
      large
      color=#7fbfff
      type="submit">
        追加
      </v-btn>
    </v-col>
  </v-row>

    </v-form>
  </v-container>
</template>
 
<script>
import axios from 'axios';

export default {
  data() {
    return {
      event: {
        ID: '',
        Title: '',
        Location: '',
        Date: '',
      },
    };
  },
  methods: {
    async addEvent() {
      
        await axios.post(
          'https://m3h-tsukagoshi-0804-gvemc6hvcpbcafa6.japaneast-01.azurewebsites.net/api/INSERT',
          this.event,
        );
        alert('イベントを追加しました。');
      } 
      }
  };
</script>