<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">StoreUT</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
        aria-controls="navbarMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggle-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="login" class="navbar-link"
              >Login</router-link
            >
          </li>
          <li class="navbar-item">
            <router-link to="home" class="navbar-link"
              >Home</router-link
            >
          </li>
          <li class="navbar-item">
            <router-link to="About" class="navbar-link"
              >About</router-link
            >
          </li>
          <li class="navbar-item">
            <router-link to="logout" class="navbar-link"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
//import firebase from "@/firebase"

export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
}
</script>
