
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
    cardArray: Array
  },
  methods:{
    formatDistance(distance){
      return Math.round(distance / 1000);
    }
  }
};
</script>

<template>
<!-- per il responsive fare un container row cols e impostare tutte le grandezze in percentuale  -->
<!-- mettere tutti i colori del sito in delle variabili scss -->
      <router-link
        v-for="object in cardArray"
        :key="object.apartment.id"
        :to="{name: 'apartment-detail', params:{slug: object.apartment.slug}}"
        class="link m-2">
          <div class="card mb-4" style="width: 17rem">
            <div class="image">
              <!-- Da sistemare lo sponsor mettere da api il parametro -->
              <span
              v-if="object.apartment.sponsors.length > 0 "
                class="badge">
                Sponsorizzato</span>
              <img :src="object.apartment.img " :alt="object.apartment.title" />
            </div>
            <div class="card-body p-2">
              <div class="card-text p-1">
                <h5>{{ object.apartment.title }}</h5>
                <p>{{ object.apartment.address }}</p>
                <p>Distanza: {{ this.formatDistance(object.distance) }} Km</p>
              </div>
            </div>
          </div>
        </router-link>
  

</template>

<style style lang="scss" scoped>
.card {
  width: 100%;
  min-height: 500px;
  max-height: 500px;
  border: 1px solid #d5e5e9;
  .image {
    width: 100%;
    height: 350px;
    max-height: 350px;
    min-height: 350px;
    position: relative;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #19A7CE;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      
    }
  }
  p {
    color: #19A7CE;
  }
  .link {
    text-decoration: underline;
    position: absolute;
    bottom: 10px;
  }

}


</style>