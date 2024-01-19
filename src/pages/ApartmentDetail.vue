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
    };
  },
  methods: {
    getApartment(slug) {
      axios
        .get(store.apiUrl + "apartments/apartment-detail/" + slug)
        .then((res) => {
          this.apartment = res.data.apartment;
        });
    },

    sendForm() {
      const data = {
        email: this.email,
        message: this.message,
      };

        axios.get(store.apiUrl + "send_email/" + data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
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
  },
};
</script>

<template>
  <div class="container my-5">
    <h1 class="my-4">{{ apartment.title }}</h1>
    <p>{{ apartment.address }}</p>
    <div class="d-flex">
      <div class="image me-5">
        <img :src="apartment.img" alt="" />
      </div>
      <div>
        <h3>Dettagli:</h3>
        <ul>
          <li>Camere totali: {{ apartment.rooms }}</li>
          <li>Bagni totali: {{ apartment.bathrooms }}</li>
          <li>Posti letto totali: {{ apartment.beds }}</li>
        </ul>
        <h3>Servizi aggiuntivi:</h3>
        <p>{{ servicesList }}</p>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image {
  width: 800px;
  img {
    width: 100%;
  }
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
</style>