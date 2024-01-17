
<script>
import { store } from "../data/store";
export default {
  name: "ApartmentCards",
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div v-for="apartment in store.apartments" :key="apartment.id" class="card" style="width: 18rem">
    <img src="{{ apartment.image }}" class="card-img-top" alt="..." />
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