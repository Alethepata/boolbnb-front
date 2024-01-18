<script>
import axios from 'axios';
import { store } from '../data/store';
import ApartmentCards from '../components/partials/ApartmentCards.vue';

export default {
  name: 'RicercaAppartamenti',
  components: {
    ApartmentCards
  },
  data() {
    return {
      store,
      position: '',
      range: 100,
      beds: 0,
      rooms: 0,
      latitude: 0,
      longitude: 0,
      services: [],
      requestServices:''
      }
  },
  methods: {

    GetLatLon(){


        axios.get(store.tomTomApiUrl + encodeURIComponent(this.position) + '.json?key=' + store.tomTomApiKey)
        .then(res =>{
          this.latitude = res.data.results[0].position.lat;
          this.longitude = res.data.results[0].position.lon;
          this.Search();
        });

    },

    Search(){
      axios.get(store.apiUrl + 'apartments/search-apartments/' + this.rooms + '/' + this.beds + '/'+ this.latitude + '/' + this.longitude + '/' + this.range + '/' + this.requestServices)
        .then(res =>{
          store.apartmentsFiltred = res.data.filteredApartments;
        });
    },

    getServices(){
      axios.get(store.apiUrl + 'services')
      .then(res =>{
        this.services = res.data.services;
        console.log(this.services);
      })
    },

    saveServices(id){
      this.requestServices+= id + ',';
      console.log(this.requestServices);
    },

    saveAllServices(){

      this.services.forEach(service =>{
        this.requestServices+= service + ',';
      })
    }

  },
  mounted(){
    this.getServices();
    this.saveAllServices();
  }
}
</script>

<template>
  <h1>Ricerca</h1>
  
  <div class="d-flex">
    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="position">
    <input type="number" class="form-control" id="rangekm" v-model="range">
    <input type="number" class="form-control" id="beds" v-model="beds">
    <input type="number" class="form-control" id="rooms" v-model="rooms">
    <button class="btn btn-outline-success" type="submit" @click="this.GetLatLon()">Search</button>
  </div>

  <div  v-for="service in this.services" :key="service.id">
      <input class="form-check-input" type="checkbox" :value="service.id" :id="service.id" @click="saveServices(service.id)">
      <label class="form-check-label" :for="service.id">
        {{ service.title }}
      </label>
  </div>

  <div class="container my-5">
    <ApartmentCards :cardObj="store.apartmentsFiltred"/>
  </div>

</template>

<style>

</style>