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
    //Old Version (not working)
    // GetLatLon(){

    //   if(this.latitude == 0 && this.longitude == 0){
    //     this.Search();
    //   }else{
    //     axios.get(store.tomTomApiUrl + encodeURIComponent(this.position) + '.json?key=' + store.tomTomApiKey)
    //     .then(res =>{
    //       this.latitude = res.data.results[0].position.lat;
    //       this.longitude = res.data.results[0].position.lon;
    //       this.Search();
    //     });
    //   }

    // },

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
      axios.get(store.apiUrl + 'apartments/search-apartments/'  + this.latitude + '/' + this.longitude + '/' + this.range + '/' + this.rooms + '/' + this.beds + '/' + this.requestServices)
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

    getServices(){
      axios.get(store.apiUrl + 'services')
      .then(res =>{
        this.services = res.data.services;
        // console.log(this.services);
      })
    },

    saveServices(id){
      this.requestServices+= id + ',';
      console.log(this.requestServices);
    }

  },
  mounted(){
    this.getServices();
    const apartments = store.apartmentsFounded;
    const isError = store.apiError;
    console.log(apartments,isError);
    if(apartments != null && isError !=null){
      this.apartmentsFiltred = apartments;
      this.isError = isError;
    }
  }
}
</script>

<template>
  <h1>Ricerca Avanzata</h1>
  
  <div class="d-flex">
    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="position">
    <input type="number" class="form-control" id="rangekm" v-model="range">
    <input type="number" class="form-control" id="beds" v-model="beds">
    <input type="number" class="form-control" id="rooms" v-model="rooms">
    <button class="btn btn-outline-success" type="submit" @click="this.GetLatLon()">Search</button>
  </div>
  <h5 class="text-dark my-3">Servizi aggiuntivi:</h5>
  <div class="d-flex flex-wrap">
    <div  v-for="service in this.services" :key="service.id" class="d-flex">
      <input class="form-check-input mx-1" type="checkbox" :value="service.id" :id="service.id" @click="saveServices(service.id)">
      <label class="form-check-label mx-1" :for="service.id">
        {{ service.title }}
      </label>
    </div>
  </div>

  <div v-if="this.isError" class="mt-3">
    <h3 class="text-dark">Nessun risultato</h3>
  </div>

  <div class="container my-5 d-flex flex-wrap justify-content-evenly">
    <ApartmentCards :cardObj="this.apartmentsFiltred"/>
  </div>

</template>

<style>

</style>