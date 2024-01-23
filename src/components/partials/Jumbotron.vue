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
    <div class="jumbotron">
        <div class="search-bar">
            <h1>Trova l'alloggio che fa per te</h1>
            <div class="bar">
                <input
                class="form-control me-2"
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
                <button class="btn btn-outline" type="submit" @click="this.GetLatLon()">Cerca</button>
            </div>
           
        </div>

    </div>
  
</template>

<style lang="scss" scoped>

.jumbotron {
    background-image: url(../../../public/photo-1477959858617-67f85cf4f1df.webp);
    background-size: cover;
    padding: 100px;
    height: 600px;
    .search-bar {
        margin: 0 auto;
        padding: 50px;
        width: 40%;
        height: 70%;
        border-radius: 30px;
        #autocompleteList{
            width: calc(100% - 40px);
            position: absolute;
            z-index: 999;
        }
        h1 {
            color: #146C94;
            text-align: center;
        }
        .bar {
            position: relative;
            width: 100%;
            margin: auto;
            text-align: center;
            padding: 20px;
            input {
                background-color: #F6F1F1;
                border: 2px solid #146C94;
                height: 60px;
            }
            button {
                margin: 20px;
                color: #F6F1F1;
                border: 1px solid #F6F1F1;
                &:hover {
                    background-color: #19A7CE;
                }
            }
        }

    }

}
</style>