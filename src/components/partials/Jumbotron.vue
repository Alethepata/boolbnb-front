<script>
import { store } from "../../data/store";
import axios from 'axios';
export default {
name: 'Jumbotron',
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
        };
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
        axios.get(store.apiUrl + 'apartments/search-apartments/'  + this.latitude + '/' + this.longitude + '/' + this.range + '/')
            .then(res =>{
            // console.log('Search() success');
            store.apiError = false;
            this.isError = store.apiError;
            store.apartmentsFounded = res.data.filteredApartments;
            this.filteredApartments = store.apartmentsFounded;
            // console.log(this.apartmentsFiltred);
            this.$router.push({
                name: 'ricerca' // Nome della rotta di destinazione
                // params: {apartments: this.apartmentsFiltred, isError: this.isError }, // Dati che desideri passare
            });
            })
            .catch(error=>{
            store.apiError = true;
            this.isError = store.apiError;
            store.apartmentsFounded = [];
            this.filteredApartments = store.apartmentsFounded;
            this.$router.push({
                name: 'ricerca' // Nome della rotta di destinazione
                // params: {apartments: this.apartmentsFiltred, isError: this.isError }, // Dati che desideri passare
            });
            });
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

    }    
};
</script>

<template>

    <!-- Versione desktop  -->
    <div class="jumbotron justify-content-between align-items-center">

        <div class="text-content text-center">
            <h1>Benvenuti su Boolbnb !</h1>
            <p>Boolbnb è la tua piattaforma di riferimento per gli affitti brevi. Offriamo una selezione di proprietà uniche e accoglienti che ti faranno sentire a casa, ovunque tu decida di viaggiare.</p>
        </div>

        <div class="image">
            <img class="rounded-5" src="/public/salotto.avif" alt="">
        </div>

    </div>
    <div class="background-search-bar ">
        <div class="search-bar rounded-5">
                <div class="bar d-flex justify-content-between align-items-center">
                <input
                class="form-control border-0"
                type="search"
                placeholder="Inserisci l'indirizzo"
                id="city"
                v-model="store.position"
                @keyup = 'this.getApi()'
                @keyup.enter="this.GetLatLon()"
                autocomplete="off"
                list="countrydata">
                <ul
                    id='autocompleteList'
                    class="list-group">
                </ul>
                <div class="button">
                    <button class="btn" type="submit" @click="this.GetLatLon()">&#9740;</button>
                </div>
            </div>  
        </div>
    </div>
    <!-- fine versione desktop  -->

    <!-- Versione Mobile  -->
    <div class="jumbotron-m align-items-center">

        <div class="text-content text-center">
            <h1>Benvenuti su Boolbnb !</h1>
            <p>Boolbnb è la tua piattaforma di riferimento per gli affitti brevi. Offriamo una selezione di proprietà uniche e accoglienti che ti faranno sentire a casa, ovunque tu decida di viaggiare.</p>
        </div>
    </div>
    <div class="background-search-bar-m ">
        <div class="search-bar-m rounded-5">
            <div class="bar-m d-flex justify-content-between align-items-center">
                <input
                    class="form-control border-0"
                    type="search"
                    placeholder="Inserisci l'indirizzo"
                    id="city"
                    v-model="store.position"
                    @keyup = 'this.getApi()'
                    @keyup.enter="this.GetLatLon()"
                    autocomplete="off"
                    list="countrydata">
                <ul
                    id='autocompleteList'
                    class="list-group">
                </ul>
                <div class="button">
                    <button class="btn" type="submit" @click="this.GetLatLon()">&#9740;</button>
                </div>
            </div>  
        </div>
    </div>

  
</template>

<style lang="scss" scoped>

.jumbotron {
    background-size: cover;
    padding: 100px;
    height: 600px;
    padding-top: 140px;
    max-width: 1440px;
    margin: 0 auto;

    img{
        box-shadow: 10px 10px rgb(225, 222, 222);
    }
    .text-content{
        margin-right:30px ;
        h1{
            color: #146C94;
            font-weight: 600;
        }
        p{
            color: #724D3F;
            font-size: 18px;
        }
    }
    
}
.background-search-bar{
    position: relative;
    width: 100%;
    padding-bottom: 50px;
}

.search-bar {
    width: 500px;
    margin: 0 auto;
    padding: 10px 10px;
    border: 1px solid #724D3F;
    overflow: hidden;
    background-color: white;

    #autocompleteList{
        width: 482px;
        margin: 0 auto;
        position: absolute;
        z-index: 999;
        top: 72px;
        height: 100%;
        overflow-y: auto;
    }

    .bar {
        input {
            background-color: rgba(255, 255, 255, 0);
            &::placeholder{
                color: #724D3F;
            }
            &:focus{
                box-shadow: none;            
                &::placeholder{
                color: #146C94;
            }
            }

        }
        button {
            padding: 0;
            margin: 0;
            background-color: #146C94;
            color: white;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            transform: scaleY(-1);
            font-size: 31px;
            border-radius: 50%;
        }
    }

 }
</style>