<script>
import axios from "axios";
import { store } from "../data/store";
import Loader from "../components/partials/Loader.vue";


export default {
  name: "ApartmentDetail",
  components:{
    Loader
  },

  data() {
    return {
      store,
      apartment: {},
      email: "",
      message: "",
      success: false,
      ip_address: "",
      isLoaded: false
    };
  },
  methods: {
    getApartment(slug) {
      axios
        .get(store.apiUrl + "apartments/apartment-detail/" + slug)
        .then((res) => {
          this.apartment = res.data.apartment;
          this.initMap();
        });
    },

    sendForm() {

      if(this.email != "" && this.message != "") {        
        this.isLoaded = true;
        axios.get(store.apiUrl + "send-message/" + this.apartment.id + "/" + this.email + "/" + this.message)
        .then((res) => {
          console.log(res.data);
          this.success = res.data.success;
          this.email = '';
          this.message = '';
          setTimeout(() => {            
            this.isLoaded = false;
          }, 2000);
        })
      }
    

    },

    saveView(){

      axios.get("https://api.ipify.org?format=json")
      .then(res=>{
        this.ip_address = res.data.ip;
        axios.get(store.apiUrl + "save-view/" + this.apartment.id + "/" + this.ip_address)
        .then(res=>{
          console.log(res.data);
        })
      })

    },
    initMap() {

          let map;

          map = tt.map({
            key: store.tomTomApiKey,
            container: 'map',
            basePath: 'sdk/',
            center: [this.apartment.longitude, this.apartment.latitude],
            zoom: 16,
            theme: {
              style: 'buildings',
              layer: 'basic',
              source: 'vector'
            },
          });
          map.addControl(new tt.NavigationControl());

          const element = document.getElementById('marker');
          const marker = new tt.Marker({
            element: element,
            anchor: 'center',
          }).setLngLat([this.apartment.longitude, this.apartment.latitude]);

          marker.addTo(map);
    },
  },
  computed: {
    servicesList() {
      return this.apartment.services
        ?.map((service) => service.title)
        .join(" - ");
    },
  },
  mounted() {
    this.getApartment(this.$route.params.slug);
    this.saveView();
  },
};
</script>

<template>
  <div class="container">
    <h2 class="my-4">{{ apartment.title }}</h2>
    <div class="left-cont">

      <div class="image" :style="`background-image: url(${apartment.img});`"></div>
      
      <div class="body-detail">
        
        <div>
          <h3>Dettagli</h3>
          <span class="mx-1">&#128107; {{ apartment.rooms }}</span>
          <span class="mx-1">&#128705; {{ apartment.bathrooms }}</span>
          <span class="mx-1">&#128716; {{ apartment.beds }}</span>
          <span class="mx-1">&#127960; {{ apartment.square_meters }}m²</span>
          

          <h6 class="mt-3">Servizi aggiuntivi:</h6>
          <p>{{ servicesList }}</p>

        </div>

        <div>
          <h3>Dove ti troverai</h3>
          <p>{{ apartment.address }}</p>
          <div id="map" class="map"></div>
        </div>

      </div>

    </div>
    <div>
      <div class="card-form">  

        <Loader v-if="isLoaded"/>

        <div v-else>          

          <div v-if="success" class="d-flex align-items-center flex-column">

            <svg class="animated-check" viewBox="0 0 24 24">
                <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> 
            </svg>

            <h4>Messaggio inviato con successo!</h4>

          </div>
          <div v-else>

            <p>Invia un messaggio al proprietario per avere piu informazioni sull appartamento</p>

            <form @submit.prevent="sendForm()">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Email
                </label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control border-blue"
                  id="exampleFormControlInput1"
                  style="width: 300px;"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  >Messaggio</label
                >
                <textarea
                  class="form-control border-blue"
                  v-model="message"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  style="max-height: 100px; min-height: 100px;"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-blue">Invio</button>
            </form>
          </div>

        </div>

        
      </div>
      




    </div>
  </div>
</template>

<style lang="scss" scoped>


.container{
  padding-top: 100px;

.body-detail{
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h6,
h3 {
  color: #146C94;
}

h2 {
  color: #724D3F;
}

span{
  color: black;
}

ul {
  padding: 0px;
  li {
    color: black;
  }
}

.card-form{
  margin-top: 50px;
  padding: 25px;
  margin-bottom: 50px;
  border-radius: 10px;
  height: 400px;
  border: 1px solid #146C94;
  box-shadow: 0px 0px 10px 0px lightgray;
  p{
    color: #146C94;
    font-weight: bold;
    font-size: 1.3rem;
  }

  .border-blue {
      border: 1px solid #146C94;
  }
}
}


// SUCCESS CHECKS

.animated-check {
    height: 10em;
    width: 10em
}

h4{
  color: #146C94;
}

.animated-check path {
    fill: none;
    stroke: #146C94;
    stroke-width: 4;
    stroke-dasharray: 23;
    stroke-dashoffset: 23;
    animation: draw 1s linear forwards;
    stroke-linecap: round;
    stroke-linejoin: round
}

@keyframes draw {
    to {
        stroke-dashoffset: 0
    }
}

</style>