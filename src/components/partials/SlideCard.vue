<script>
import { store } from '@/data/store';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/navigation';

  import 'swiper/css/pagination';
  // import required modules
  import { Pagination, Navigation } from 'swiper/modules';
  import ApartmentCards from './ApartmentCards.vue';
  import CardSliderHome from './CardSliderHome.vue';
export default {
  name:'SlideCard',
    components: {
      Swiper,
      SwiperSlide,
      ApartmentCards,
      CardSliderHome
    },
    props:{
      apartments: Array
    },
    data() {
      return {
        store,
        modules: [Pagination, Navigation],
      };
    }
  };
</script>

<template>
  <swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :modules="modules"
    class="mySwiper"
  >
    
    <swiper-slide v-for="apartment in apartments" :key="apartment.id" ><CardSliderHome :apartment="apartment"/>
    </swiper-slide>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  
  </swiper>
</template>

<style lang="scss" >
.swiper-pagination-bullets{
  position: relative;
  bottom: -3px !important;
}

.swiper-slide {
  margin-right: 0px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

