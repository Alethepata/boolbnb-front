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
//     GetLatLon(){

//       this.latitude = 0;
//       this.longitude = 0;
//         axios.get(store.tomTomApiUrl + encodeURIComponent(this.position) + '.json?key=' + store.tomTomApiKey)
//         .then(res =>{
//           // console.log('Sto prendendo le coordinate');
//           this.latitude = res.data.results[0].position.lat;
//           this.longitude = res.data.results[0].position.lon;
//           // console.log(res.data.results,this.latitude,this.longitude);
//           this.Search();
//         });
      

// },
//     Search(){
//       axios.get(store.apiUrl + 'apartments/search-apartments/'  + this.latitude + '/' + this.longitude + '/' + this.range + '/')
//         .then(res =>{
//           // console.log('Search() success');
//           store.apiError = false;
//           this.isError = store.apiError;
//           store.apartmentsFounded = res.data.filteredApartments;
//           this.filteredApartments = store.apartmentsFounded;
//           // console.log(this.apartmentsFiltred);
//           this.$router.push({
//             name: 'ricerca' // Nome della rotta di destinazione
//             // params: {apartments: this.apartmentsFiltred, isError: this.isError }, // Dati che desideri passare
//           });
//         })
//         .catch(error=>{
//           store.apiError = true;
//           this.isError = store.apiError;
//           store.apartmentsFounded = [];
//           this.filteredApartments = store.apartmentsFounded;
//           this.$router.push({
//             name: 'ricerca' // Nome della rotta di destinazione
//             // params: {apartments: this.apartmentsFiltred, isError: this.isError }, // Dati che desideri passare
//           });
//         });

// },
  },
  mounted() {
    this.getApi(store.apiUrl + 'apartments')
    store.position = '';
  }

}

</script>

<template>
  
  <Jumbotron />
  
  <div class="container    p-5 ">
    <SlideCard/>

   
  </div>
  
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  padding: 80px;
}
</style>