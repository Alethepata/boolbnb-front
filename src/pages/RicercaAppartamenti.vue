<script>
import axios from 'axios';
import { store } from '../data/store';
import ApartmentCards from '../components/partials/ApartmentCards.vue';
import LoaderSearch from '../components/partials/LoaderSearch.vue';

export default {
  name: 'RicercaAppartamenti',
  components: {
    ApartmentCards,
    LoaderSearch
  },
  data() {
    return {
      store,
      position:'',
      range: 5,
      beds: 0,
      rooms: 0,
      latitude: 0,
      longitude: 0,
      services: [],
      requestServices:[],
      isError: false,
      apartmentsFiltred: [],
      isSearch: false,
      isLoaded: false
      }
  },
  methods: {
    GetLatLon(){
      console.log(store.position);
      if(store.position === undefined || store.position === '' || store.position === null){
        this.isSearch = true;
        this.isLoaded = false;
        this.isError = true;
        
      }else{
        this.isSearch = true;
        this.isLoaded = true;
        this.latitude = 0;
        this.longitude = 0;
        this.position = store.position;
          axios.get(store.tomTomApiUrl + encodeURIComponent(this.position) + '.json?key=' + store.tomTomApiKey)
          .then(res =>{
            console.log('Sto prendendo le coordinate');
            this.latitude = res.data.results[0].position.lat;
            this.longitude = res.data.results[0].position.lon;
            console.log(this.latitude,this.longitude);
            this.Search();
          })
      }
        
},


Search() {
  let apartmentsSponsor = [];
  let apartmentsNotSponsor = [];
  let apartments = [];
  // console.log('ho lanciato search()');
  axios.get(store.apiUrl + 'apartments/search-apartments/'  + this.latitude + '/' + this.longitude + '/' + this.range + '/' + this.rooms + '/' + this.beds + '/' + this.requestServices)
    .then(res => {
      // console.log('search() Success');
      this.isLoaded = false;

      // this.apartmentsFiltred = res.data.filtredApartments;
      apartments = res.data.filtredApartments;
      apartmentsSponsor = this.filterSponsor(apartments);
      apartmentsNotSponsor = this.filterNotSponsor(apartments);
      
      this.apartmentsFiltred = apartmentsSponsor.concat(apartmentsNotSponsor);
      // console.log(this.apartmentsFiltred);

      if (this.apartmentsFiltred.length === 0) {
        this.isError = true;
      } else {
        this.isError = false;
      }
    })
    .catch(error => {
      console.log('Search() failed');
      this.isLoaded = false;
      this.isError = true;
      this.apartmentsFiltred = [];
    });
},

filterSponsor(arrayApt){
const arrayFiltered = arrayApt.filter(apt => apt.apartment.sponsors.length > 0);
return arrayFiltered;
},
filterNotSponsor(arrayApt){
const arrayFiltered = arrayApt.filter(apt => apt.apartment.sponsors.length == 0);
return arrayFiltered;
},

    getServices(){
      axios.get(store.apiUrl + 'services')
      .then(res =>{
        this.services = res.data.services;
        // console.log(this.services);
      })
    },

    saveServices(id){

      if(this.requestServices.includes(id)){
        this.requestServices.pop(id);
      }else{
        this.requestServices.push(id);
      }
      this.Search();
      // console.log(this.requestServices);
    },
    getApi() {
            const search = store.position.trim();

            if (search.length < 4) return;

            axios.get(`${store.tomTomApiUrl}${encodeURIComponent(search)}.json?key=${store.tomTomApiKey}`)
                .then(response => {
                    if (response.data.results.length > 0) {
                        const niceResults = response.data.results.map((result) => ({
                            address: {
                                freeformAddress: result.address.freeformAddress,
                            },
                            position: result.position
                        }));
                        this.updateAutocompleteList(niceResults);
                    }
                })
                .catch(error => {
                    console.error('Errore nella chiamata API di TomTom:', error);
                });

        },

        updateAutocompleteList(results) {
            // Cancella l'elenco precedente
            const list = document.getElementById('autocompleteList');
            list.innerHTML = '';

            // Aggiungi i nuovi suggerimenti all'elenco
            results.forEach(result => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');

                //active al passaggio del mouse
                listItem.addEventListener("mouseover", function() {
                    this.classList.add("active");
                });
                listItem.addEventListener("mouseout", function() {
                    this.classList.remove("active");
                });
                //

                listItem.textContent = result.address.freeformAddress;
                // Aggiungi un gestore di eventi per gestire la selezione di un suggerimento
                listItem.addEventListener('click', function() {
                    store.position = result.address.freeformAddress;
                    list.innerHTML =
                        '';
                });

                list.appendChild(listItem);
            });
        }

  },
  mounted(){
    console.log(store.position);
    this.getServices();
    const apartments = store.apartmentsFounded;
    const isError = store.apiError;
    // console.log(apartments,isError);
    if(apartments != null && !isError && store.isFromHome){
      this.apartmentsFiltred = apartments;
      this.isError = isError;
      store.isFromHome = false;
      this.GetLatLon();
    }
  }
}
</script>

<template>
  <div class="container container-search">
    
    <!-- Versione Desktop  -->
    <div class="main-box mt-5">

      <h1>Ricerca Avanzata</h1>

      <div class="high-filter">

        <div class="filter-side my-4">

          <div class="col-8 inputSearch mb-3">
            <input
              id="search"
              class="form-control me-2 border-blue"
              type="search"
              placeholder="Dove?"
              aria-label="Search"
              @keyup = 'this.getApi()'
              list="countrydata"
              autocomplete="off"
              v-model="store.position">
      
            <ul id="autocompleteList"
                class="list-group">
            </ul>
          </div>

          <div class="d-flex align-items-center">

            <div class="col-3 pt-3 text-center me-4">
              <label for="rangekm">Raggio (Km)</label>
              <input type="text" class="form-control select border-none" id="rangekm" v-model="range" readonly>
              <input type="range" class="form-range custom-range" min="5" max="40" step="5" id="rangekm" v-model="range">
            </div>
  
            <div class="col-3 pt-3 text-center me-4">
              <label for="beds">Numero Letti</label>
              <input type="text" class="form-control select border-none" id="beds" v-model="beds" readonly>
              <input type="range" class="form-range custom-range" min="0" max="10" step="1" id="beds" v-model="beds">
            </div>
  
            <div class="col-3 pt-3 text-center me-4">
              <label for="rooms">Numero Stanze</label>
              <input type="text" class="form-control select border-none" id="rooms" v-model="rooms" readonly>
              <input type="range" class="form-range custom-range" min="0" max="20" step="1" id="rooms" v-model="rooms">
            </div>
  
          </div>

          <div class="col-4 pt-5 btn-desktop">
            <button class="btn btn-outline-primary btn-blue" @click="this.GetLatLon()">Cerca</button>
          </div>
    

        </div>

        <div class="service-side">

          <h5 class="my-3">Servizi aggiuntivi:</h5>

          <div class="d-flex flex-wrap">

            <div  v-for="service in this.services" :key="service.id" class="d-flex service">
              <input class="form-check-input mx-1 border-blue check-pers" type="checkbox" :value="service.id" :id="service.id" @click="saveServices(service.id)">
              <label class="form-check-label mx-1" :for="service.id">
                {{ service.title }}
              </label>
            </div>

          </div>

        </div>
      
      </div>
      <div class="col-4 pt-5 btn-mobile">
        <button class="btn btn-m" type="submit" @click="this.GetLatLon()">Cerca</button>
    </div>

    </div>
    <!--Fine Versione Desktop  -->

    <div class="container-fluid results-container my-5" v-if="isSearch">
      
      <h2 class="text-center mb-5">Risultati</h2>
      
        <LoaderSearch v-if="isLoaded"/>

        <div v-else>

          <div v-if="this.isError" class="mt-3">
            <h3 class="text-dark m-0 text-center">Nessun risultato trovato</h3>
          </div>
  
  
          <div class="container-fluid d-flex flex-wrap justify-content-center" v-else>
              <ApartmentCards :cardArray="this.apartmentsFiltred"/>
          </div>

        </div>


    </div>

    
    
    

    </div>
  
</template>

<style lang="scss" scoped>




.results-container{
  h2{
    color: #146C94;
  }
}


</style>