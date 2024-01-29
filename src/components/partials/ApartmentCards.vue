
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
  methods:{
    formatDistance(distance){
      return Math.round(distance / 1000);
    }
  }
};
</script>

<template>
  <router-link :to="{name: 'apartment-detail', params:{slug: apartment.slug}}" class="link w-50 m-2">
  <div class="card border-0" style="width: 18rem">
    <div class="image">
      <span class="badge">Sponsorizzato</span>
      <img :src="object.apartment.img " class="card-img-top" :alt="object.apartment.title" />
    </div>
    <div class="card-body p-2">
      <div class="card-text">
        <h5>{{ apartment.title }}</h5>
        <p>{{ city }}</p>
      </div>
    </div>
  </div>
</router-link>

</template>

<style style lang="scss" scoped>

.card {
  .image {
    position: relative;
    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #19A7CE;
    }
    img {
     border-radius: 20px;
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