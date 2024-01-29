
<script>
import { store } from "../../data/store";
export default {
  name: 'ApartmentCards',
  data() {
    return {
      store
    };
  },
  props: {
    cardArray:Array
  },
  methods:{
    formatDistance(distance){
      return Math.round(distance / 1000);
    }
  }
};
</script>

<template>
  <div v-for="object in cardArray" :key="object.apartment.id" class="card" style="width: 18rem">
    <div class="image">
      <span class="badge">Sponsorizzato</span>
      <img :src="object.apartment.img " class="card-img-top" :alt="object.apartment.title" />
    </div>
    <div class="card-body">
      <div class="card-text">
        <h5>{{ object.apartment.title }}</h5>
        <p>{{ object.apartment.address }}</p>
        <p>Distanza: {{ this.formatDistance(object.distance) }} Km</p>
        <router-link :to="{name: 'apartment-detail', params:{slug: object.apartment.slug}}" class="link w-50 m-2">Dettaglio</router-link>
      </div>
    </div>
  </div>
</template>

<style style lang="scss" scoped>

.card {
  border: 3px solid #19A7CE;
  border-radius: 20px;
  background-color: #0973a1;
  color: white;
  width: 100%;
  height: 400px;
  text-align: center;
  position: relative;
  .image {
    width: 90%;
    height: 50%;
    margin: 10px auto;
    flex-grow: stretch;
    position: relative;
    .badge {
      position: absolute;
      top: 2px;
      left: 10px;
      background-color: #19A7CE;
    }
    img {
      width: 100%;
      height: 95%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  p {
    color: #19A7CE;
  }
  .link {
    color: white;
    text-decoration: underline;
    position: absolute;
    bottom: 10px;
  }

}


</style>