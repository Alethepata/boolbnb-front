
<script>
import { store } from "../../data/store";
export default {
  name: 'ApartmentCards',
  data() {
    return {
      store,
    };
  },
  props: {
    cardObj:Object
  }
};
</script>

<template>
  <div v-for="apartment in cardObj" :key="apartment.id" class="card" style="width: 18rem">
      <img :src="apartment.img " class="card-img-top" :alt="apartment.title" />
    <div class="card-body">

      <div class="card-text">
        <h2>{{ apartment.title }}</h2>
        <p>{{ apartment.address }}</p>
      </div>
    </div>
  </div>
</template>

<style>
</style>