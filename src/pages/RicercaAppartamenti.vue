<script>
import axios from 'axios';
import { store } from '../data/store';

export default {
  name: 'RicercaAppartamenti',
  components: {
      
  },
  data() {
    return {
      store,
        search:''
      }
  },
  methods: {
    getApi() {
      axios.get(store.apiUrl + 'apartments')
    }
  }
}
</script>

<template>
  <h1>Ricerca</h1>
  <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>

</template>

<style>

</style>