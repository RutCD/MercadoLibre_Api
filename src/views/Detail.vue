<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <b-carousel
          id="carousel_01"
          style="text-shadow: 0px 0px 2px #000"
          fade
          indicators
          img-width="400"
          img-height="250"
          :interval="4000"
          controls
        >
          <b-carousel-slide
            v-for="pic in product.pictures"
            :key="pic.id"
            :img-src="pic.secure_url"
            :caption="pic.id"
          ></b-carousel-slide>
        </b-carousel>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h3>{{ product.title }}</h3>
            </div>
            <div
              class="col-md-4"
              v-for="attr in product.attributes"
              :key="attr.id"
            >
              <b>{{ attr.name }}</b> : {{ attr.value_name }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="col-12">
          <b-form-input
            type="number"
            max="10"
            min="1"
            v-model="amount"
          ></b-form-input>
          <button @click="addCar" class="btn btn-primary">Add to Car</button>
        </div>
        <div class="col-12" id="details"></div>
        <div class="col-12" id="total">
          <p><b>Total $</b> {{ total }}</p>
          <router-link :to="{ name: 'checkout' }" class="btn btn-success"
            >Checkout</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      product: {},
      amount: 1,
      items: [],
      local: [],
      subItems: [],
      total: 0,
    };
  },
  created() {
    let id = this.$route.params.id;
    axios
      .get(
        "https://api.mercadolibre.com/items/" + id + "?include_attributes=all"
      )
      .then((result) => {
        this.product = {};
        console.log(result);
        this.product = result.data;
      });
    let data = JSON.parse(localStorage.getItem("storeUT"));
    if (data) {
      this.items = data;
      var x = 0;
      console.log(this.items.length);
      for (x = 0; x < this.items.length; x++) {
        if (this.items[x].id == id) {
          this.subItems.push(this.items[x]);
        }
      }
      for (x = 0; x < this.items.length; x++) {
        if (this.items[x].id == id) {
          this.items.splice(x, 1);
          x = -1;
        }
      }
      console.log("Subitems");
      console.log(this.subItems);

      console.log("Items");
      console.log(this.items);

      this.local = this.items;
      this.getTotal();
    }
  },
  mounted: function () {
    this.drawsubItems();
  },
  methods: {
    addCar() {
      this.subItems.push({
        id: this.product.id,
        price: this.product.price,
        amount: this.amount,
        title: this.product.title,
        thumbnail: this.product.thumbnail,
      });

      //Array.prototype.push.apply(this.items, this.subItems);
      //console.log(this.items);
      /localStorage.setItem("storeUT", JSON.stringify(this.items));/;
      this.product.amount = this.amount;
      this.viewProduct(this.product);
      /this.total += this.product.price * this.amount;/;
      this.updateStorage();
      this.getTotal();
    },
    drawsubItems() {
      for (var x = 0; x < this.subItems.length; x++) {
        this.viewProduct(this.subItems[x]);
      }
    },
    viewProduct(object) {
      var box = document.getElementById("details");
      var article = document.createElement("p");
      var textContent =
        "<b>" +
        object.title +
        "</b> $ " +
        object.price +
        " Amount: " +
        object.amount;
      //var content = document.createTextNode(textContent);
      var del = document.createElement("a");
      var textLink = document.createTextNode("x");
      del.appendChild(textLink);
      del.href = "#";
      del.addEventListener("click", this.deleteArticle, false);
      article.innerHTML = textContent;
      article.appendChild(del);
      box.appendChild(article);
    },
    deleteArticle(event) {
      console.log(event);
      var current = event.target;
      var index = Array.prototype.slice
        .call(current.parentNode.parentElement.children)
        .indexOf(current.parentNode);
      //console.log(index);
      //console.log(this.subItems[index]);
      this.subItems.splice(index, 1);
      current.parentNode.parentNode.removeChild(current.parentNode);
      this.updateStorage();
      this.getTotal();
      //alert(event);
    },
    updateStorage() {
      //Array.prototype.push.apply(this.items,this.subItems);
      var storageLocal = this.local.concat(this.subItems);
      localStorage.setItem("storeUT", JSON.stringify(storageLocal));
    },
    getTotal() {
      this.total = 0;
      for (var x = 0; x < this.subItems.length; x++) {
        this.total += this.subItems[x].price * this.subItems[x].amount;
      }
    },
  },
};
</script>
