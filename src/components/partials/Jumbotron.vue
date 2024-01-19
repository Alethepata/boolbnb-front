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
    }    
};
</script>

<template>
    <div class="jumbotron">
        <div class="search-bar">
            <h1>Il tuo Appartamento</h1>
            <div class="bar">
                <input
                class="form-control me-2"
                type="search"
                placeholder="Città"
                id="city"
                v-model="store.position"
                @keyup.enter="this.GetLatLon()">
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
        background-color: #f6f1f1b1;
        border: 2px solid #146C94;
        padding: 50px;
        width: 40%;
        height: 70%;
        border-radius: 30px;
        h1 {
            color: #146C94;
            text-align: center;
        }
        .bar {
            width: 100%;
            margin: auto;
            text-align: center;
            padding: 20px;
            input {
                border: 2px solid #146C94;
                height: 60px;
                background-color: rgba(255, 255, 255, 0);
            }
            button {
                margin: 20px;
                color: #146C94;
                &:hover {
                    background-color: #19A7CE;
                }
            }
        }

    }

}
</style>