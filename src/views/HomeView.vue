<template>
  <v-container>
    <RestaurantList />
  </v-container>
</template>

<script>
import RestaurantList from '@/components/RestaurantList.vue'

export default {
  name: 'HomeView',
  components: {
    RestaurantList
  }
}
</script>
