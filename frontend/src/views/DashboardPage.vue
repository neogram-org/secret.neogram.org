<template>
  <p>Dashboard</p>
  <p>Welcome, {{ user.data }}</p>
  <q-btn @click="logOut"> Logout </q-btn>
</template>

<style>
/* .green {
  background: #28a745;
} */
</style>

<script setup>
import { useStore } from "vuex";
import { auth } from "../firebaseConfig";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

auth.onAuthStateChanged((user) => {
  store.dispatch("getLoggedInUser", user);
});

const user = computed(() => {
  return store.getters.user;
});

const logOut = async () => {
  await store.dispatch("logOut");
  router.push("/");
};
</script>
