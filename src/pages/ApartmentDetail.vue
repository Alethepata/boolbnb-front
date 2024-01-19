<script>
import axios from 'axios';
import { store } from '../data/store';

export default {
    name: 'ApartmentDetail',


    data(){
        return{
            store,
            apartment: {}
        }

    },
    methods:{

        getApartment(slug){
            axios.get(store.apiUrl + 'apartments/apartment-detail/' + slug)
            .then(res =>{
                this.apartment = res.data.apartment;

            })
        }

    },
    computed: {
    servicesList(){
      return this.apartment.services?.map(service => service.title).join(' - ');
    }

    },
        mounted(){
            this.getApartment(this.$route.params.slug);
        }
    }
</script>

<template>

    <div class="container my-5">
        <h1 class="my-4">{{ apartment.title }}</h1>
        <p>{{ apartment.address }}</p>
        <div class="d-flex">
            <div class="image me-5">
                <img :src="apartment.img" alt="">
            </div>
            <div>
                <h3>Dettagli:</h3>
                <ul>
                    <li>Camere totali: {{ apartment.rooms }}</li>
                    <li>Bagni totali: {{ apartment.bathrooms }}</li>
                    <li>Posti letto totali: {{ apartment.beds }}</li>
                </ul>
                <h3>Servizi aggiuntivi:</h3>
                <p>{{ servicesList }}</p>
            </div>
        </div>
    </div>

  
</template>

<style lang="scss" scoped>

.image{
    width: 800px;
    img{
        width: 100%;
    }
}
h3, h1{
    color: black;
}

ul{
    padding: 0px;
    li{
        color: black;
    }
}

</style>