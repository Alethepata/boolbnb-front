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
  <div class="swiper-container">
    <swiper
      :slidesPerView="3"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :modules="modules"
      class="mySwiper"
    >
      
      <swiper-slide v-for="apartment in apartments" :key="apartment.id" ><CardSliderHome :apartment="apartment"/>
      </swiper-slide>
      
    </swiper>
    <div class="swiper-button-next swiper-button"></div>
    <div class="swiper-button-prev swiper-button"></div>
  </div>
</template>

<style lang="scss" >

.swiper-container{
  position: relative;
  width: 100%;
  .mySwiper{
    width: 90%;
  }
  .swiper-slide {
    margin-right: 0px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swiper-button{
    color: #146C94;
  }
}
</style>

