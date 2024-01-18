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
  <Header/>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
