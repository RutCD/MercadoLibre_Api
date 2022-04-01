<template>
  <div class="about">
    <h1>Search a product</h1>
    <b-form class="search-product" @submit.prevent="searchProduct">
      <b-form-group
        id="label-search"
        label="Search: "
        label-for="input-search"
        description="..."
      >
        <b-form-input
          id="input-search"
          v-model="search"
          type="text"
          placeholder="..."
        ></b-form-input>
        <b-button type="submit" variant="primary">Search</b-button>
      </b-form-group>
    </b-form>
    <div>
      <b-card-group v-if="visible">
        <div :key="index" v-for="(p, index) in result">
          <b-card
            :img-src="p.thumbnail"
            img-alt=""
            img-top
            style="max-width: 15rem"
            body-bg-variant="info"
            border-variant="dark"
            text-variant="white"
            :title="p.title"
            class="mb-2"
          >
            <b-card-text>{{ p.price }}</b-card-text>
            <router-link
              class="btn btn-primary"
              :to="{ name: 'detail', params: { id: p.id } }"
              >Detail</router-link
            >
          </b-card>
        </div>
      </b-card-group>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    result: null,
    search: "",
    visible: false,
  }),
  created() {
    /**/
  },
  methods: {
    searchProduct(event) {
      event.preventDefault();
      axios
        .get("https://api.mercadolibre.com/sites/MLA/search?q=" + this.search)
        .then((result) => {
          this.result = result.data.results;
          this.visible = true;
        });
    },
  },
};
</script>
