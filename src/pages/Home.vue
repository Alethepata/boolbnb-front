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
      store
      }
  },
  methods: {
    getApi(endpoint) {
      axios.get(endpoint)
        .then(res => {
          store.apartments = res.data.apartments;
          // console.log(store.apartments)
      })
    }
  },
  mounted() {
    this.getApi(store.apiUrl + 'apartments')


  }

}

</script>

<template>
  <h1>Home</h1>
   <div class="container d-flex flex-wrap justify-content-evenly">
    <ApartmentCards/>
   </div>
</template>

<style>

</style>