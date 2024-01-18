<script>
import axios from 'axios';
import { store } from '../data/store';
import ApartmentCards from '../components/partials/ApartmentCards.vue';
export default {
  name: 'Home',
  components: {
    ApartmentCards
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
    GetLatLon(){

      this.latitude = 0;
      this.longitude = 0;
        axios.get(store.tomTomApiUrl + encodeURIComponent(this.position) + '.json?key=' + store.tomTomApiKey)
        .then(res =>{
          console.log('Sto prendendo le coordinate');
          this.latitude = res.data.results[0].position.lat;
          this.longitude = res.data.results[0].position.lon;
          console.log(res.data.results,this.latitude,this.longitude);
          this.Search();
        });
      

},
    Search(){
      axios.get(store.apiUrl + 'apartments/search-apartments/'  + this.latitude + '/' + this.longitude + '/' + this.range + '/')
        .then(res =>{
          console.log('Search() success');
          this.isError = false;
          this.apartmentsFiltred = res.data.filteredApartments;
          console.log(this.apartmentsFiltred);
        })
        .catch(error=>{
          this.isError = true;
          this.apartmentsFiltred = [];
        });

},
  },
  mounted() {
    this.getApi(store.apiUrl + 'apartments')


  }

}

</script>

<template>
  <div class="container mb-3">
    <h1>Home</h1>
    <div class="d-flex flex-wrap justify-content-evenly">
      <ApartmentCards :cardObj="store.apartments"/>
    </div>
  </div>


  <div class="container search-bar mb-3">
    <div class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="position">
      <!-- <input type="number" class="form-control" id="rangekm" v-model="range"> -->
      <button class="btn btn-outline-success" type="submit" @click="this.GetLatLon()">Search</button>
    </div>
  </div>

  <div v-if="this.isError" class="container mb-3">
    <h3 class="text-dark">Nessun risultato</h3>
  </div>
<!-- 
  <div class="container my-5 d-flex flex-wrap justify-content-evenly">
    <ApartmentCards :cardObj="this.apartmentsFiltred"/>
  </div> -->

  
</template>

<style>

</style>