
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
    apartment:Object
  },
};
</script>

<template>
  <router-link :to="{name: 'apartment-detail', params:{slug: apartment.slug}}" class="link w-50 m-2">
  <div class="card border-0" style="width: 18rem">
    <div class="image">
      <span class="badge">Sponsorizzato</span>
      <img :src="apartment.img" class="card-img-top h-100 " :alt="apartment.title" />
    </div>
    <div class="card-body p-2">
      <div class="card-text">
        <h5>{{ apartment.title }}</h5>
        <p>{{ apartment.address }}</p>
      </div>
    </div>
  </div>
</router-link>

</template>

<style style lang="scss" scoped>

.card {
  .image {
    position: relative;
    height: 400px;
    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #19A7CE;
    }
    .card-img-top {
      height: 350px;  /* Imposta l'altezza fissa */
      object-fit: cover;
      border-radius: 15px;
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