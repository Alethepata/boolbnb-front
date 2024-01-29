<script>
import axios from "axios";
import { store } from "../data/store";

export default {
  name: "ApartmentDetail",

  data() {
    return {
      store,
      apartment: {},
      email: "",
      message: "",
      success: false,
      ip_address: ""
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
    

        axios.get(store.apiUrl + "send-message/" + this.apartment.id + "/" + this.email + "/" + this.message)
        .then((res) => {
          console.log(res.data);
          this.success = res.data.success;
          this.email = '';
          this.message = '';
        })

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
  <div class="container ">
      <h1 class="py-4">{{ apartment.title }}</h1>
    <p>{{ apartment.address }}</p>
    <div class="d-flex">
      <div class="image me-5">
        <img :src="apartment.img" alt="{{ apartment.title }}" />
      </div>
      <div>
        <div>
          <h5>Dettagli:</h5>
          <ul>
            <li>Camere totali: {{ apartment.rooms }}</li>
            <li>Bagni totali: {{ apartment.bathrooms }}</li>
            <li>Posti letto totali: {{ apartment.beds }}</li>
          </ul>
        </div>
        <div>
          <h5>Servizi aggiuntivi:</h5>
          <p>{{ servicesList }}</p>
        </div>
        <div id="map" class="map"></div>
      </div>
    </div>
    <div>


      <form @submit.prevent="sendForm()">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Email
          </label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Messaggio</label
          >
          <textarea
            class="form-control"
            v-model="message"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Invio</button>
      </form>

      <div v-if="success">
        <h2 class="text-success">Messaggio inviato con successo!</h2>
      </div>


    </div>
    </div>
</template>

<style lang="scss" scoped>


  .image {
  width: 800px;
  border-radius: 10px;
  img {
    width: 100%;
    border-radius: 10px;
  }
h3,
h1 {
  color: black;
}

ul {
  padding: 0px;
  li {
    color: black;
  }
}
}

</style>