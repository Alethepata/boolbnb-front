<script>
import axios from 'axios';
import { store } from '../data/store';
import Jumbotron from '../components/partials/Jumbotron.vue';
import SlideCard from '../components/partials/SlideCard.vue';
export default {
  name: 'Home',
  components: {
    Jumbotron,
    SlideCard
  },
  data() {
    return {
      store,
      position: '',
      range: 20,
      beds: 0,
      rooms: 0,
      latitude: 0,
      longitude: 0,
      services: [],
      requestServices:'',
      isError: false,
      apartmentsFiltred: []
      }
  },
  methods: {
    getApi(endpoint) {
      axios.get(endpoint)
        .then(res => {
          store.apartments = res.data.apartments;
          // console.log(store.apartments)
      })
    },
  },
  mounted() {
    this.getApi(store.apiUrl + 'apartments');
    console.log(store.apartments);
    store.position = '';
  }

}

</script>

<template>
  
  <Jumbotron />
  <div class="my-container">
    <h2>Appartamenti Sponsorizzati</h2>
    <div class="container">
    <SlideCard :apartments="store.apartments"/>
  </div>
  </div>
  
  
</template>

<style lang="scss" scoped>

h2 {
  text-align: center;
  padding: 80px;
  color:#146C94 ;
}
</style>