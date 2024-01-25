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
      requestServices:[],
      isError: false,
      apartmentsFiltred: []
      }
  },
  methods: {
    GetLatLon(){

    this.latitude = 0;
    this.longitude = 0;
    this.position = store.position;
      axios.get(store.tomTomApiUrl + encodeURIComponent(this.position) + '.json?key=' + store.tomTomApiKey)
      .then(res =>{
        // console.log('Sto prendendo le coordinate');
        this.latitude = res.data.results[0].position.lat;
        this.longitude = res.data.results[0].position.lon;
        // console.log(res.data.results,this.latitude,this.longitude);
        this.Search();
      });


},


    Search(){
      axios.get(store.apiUrl + 'apartments/search-apartments/'  + this.latitude + '/' + this.longitude + '/' + this.range + '/' + this.rooms + '/' + this.beds + '/' + this.requestServices)
        .then(res =>{
          // console.log('Search() success');
          this.isError = false;
          this.apartmentsFiltred = res.data.filteredApartments;
          // console.log(this.apartmentsFiltred);
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

      if(this.requestServices.includes(id)){
        this.requestServices.pop(id);
      }else{
        this.requestServices.push(id);
      }
      this.Search();
      console.log(this.requestServices);
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
    this.getServices();
    const apartments = store.apartmentsFounded;
    const isError = store.apiError;
    // console.log(apartments,isError);
    if(apartments != null && isError !=null){
      this.apartmentsFiltred = apartments;
      this.isError = isError;
    }
  }
}
</script>

<template>
  <div class="container my-5">
    
    <div class="main-box">

      <h1>Ricerca Avanzata</h1>

      <div class="high-filter d-flex ">

        <div class="filter-side">

          <div class="col-8 inputSearch">
            <label for="search">Dove?</label>
            <input
              id="search"
              class="form-control me-2 border-blue"
              type="search"
              placeholder="Search"
              aria-label="Search"
              @keyup = 'this.getApi()'
              list="countrydata"
              autocomplete="off"
              v-model="store.position">
      
            <ul id="autocompleteList"
                class="list-group">
            </ul>
          </div>
    
          <div class="col-4 pt-3">
            <label for="rangekm">Raggio di ricerca (Km)</label>
            <input type="text" class="form-control select border-none" id="rangekm" v-model="range" readonly>
            <input type="range" class="form-range custom-range" min="20" max="200" step="20" id="rangekm" v-model="range">
          </div>

          <div class="col-4 pt-3">
            <label for="beds">Numero di Letti</label>
            <input type="text" class="form-control select border-none" id="beds" v-model="beds" readonly>
            <input type="range" class="form-range custom-range" min="0" max="10" step="1" id="beds" v-model="beds">
          </div>

          <div class="col-4 pt-3">
            <label for="rooms">Numero di Stanze</label>
            <input type="text" class="form-control select border-none" id="rooms" v-model="rooms" readonly>
            <input type="range" class="form-range custom-range" min="0" max="20" step="1" id="rooms" v-model="rooms">
          </div>

          <div class="col-4 pt-5">
            <button class="btn btn-outline-primary border-blue" type="submit" @click="this.GetLatLon()">Cerca</button>
          </div>

        </div>

        <div class="service-side">

          <h5 class="text-dark my-3">Servizi aggiuntivi:</h5>

          <div class="d-flex flex-wrap">

            <div  v-for="service in this.services" :key="service.id" class="d-flex service">
              <input class="form-check-input mx-1 border-blue" type="checkbox" :value="service.id" :id="service.id" @click="saveServices(service.id)">
              <label class="form-check-label mx-1" :for="service.id">
                {{ service.title }}
              </label>
            </div>

          </div>

        </div>
      
      </div>

    </div>

    <div class="container-fluid results-container">
      <div v-if="this.isError" class="mt-3">
        <h3 class="text-dark m-0">Nessun risultato</h3>
      </div>

      
      <div class="container my-5 d-flex flex-wrap justify-content-evenly">
        <ApartmentCards :cardObj="this.apartmentsFiltred"/>
      </div>
    </div>

    
    
    

    </div>
  
</template>

<style lang="scss" scoped>
.main-box{
  background-color: white;
  border: 2px solid #146C94;
  border-radius: 30px;
  padding: 50px;
  .border-blue {
      border: 2px solid #146C94;
    }
  .inputSearch{
    position: relative;
    #autocompleteList{
              width: 100%;
              position: absolute;
              z-index: 999;
          }
  }
  .filter-side {
    width: 50%;
    .custom-range::-moz-range-thumb {
      background: #146C94;
    }
    .border-none {
      border: none;
    }

    
    .select {
      text-align: center;
      pointer-events: none;
    }

    button {
      color: #146C94;
      &:hover {
        background-color: #AFD3E2;
      }
    }
  }


  .service-side {
    width: 50%;
    .service {
      width: 50%;
    }
  }
}

.results-container{
  padding: 50px;
}


</style>