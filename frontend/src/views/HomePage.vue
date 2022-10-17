<template>
  <p>Neogram</p>
  <p>
    Welcome back, {{ user.data != null ? user.data.email : "Please login" }}
  </p>
</template>

<style></style>
<!-- export default HomePage; -->

<script setup>
import { useStore } from "vuex";
import { auth } from "../firebaseConfig";
import { computed } from "vue";

const store = useStore();

auth.onAuthStateChanged((user) => {
  store.dispatch("getLoggedInUser", user);
});

const user = computed(() => {
  return store.getters.user;
});
</script>
