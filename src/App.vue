<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/partials/Header.vue";

export default {
  name: 'App',
  components: {
    Header
  }
}

</script>

<template>
  <div class="container-custom">
    <Header/>
    <RouterView />
  </div>
</template>

<style scoped>

.container-custom{
  max-height: 1440px;
}

</style>
