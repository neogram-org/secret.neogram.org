<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title
          style="
             {
              cursor: pointer;
            }
          "
          @click="goToHome"
        >
          Neogram
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" class="bg-grey-2">
      <q-list>
        <!-- <q-item clickable tag="a" href="/">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item> -->

        <q-item v-if="user.data != null" clickable tag="a" href="/">
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="user.data != null" clickable tag="a" href="/message">
          <q-item-section>
            <q-item-label>Send Message</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="user.data != null" clickable tag="a" @click="logOut">
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>

        <div v-else-if="user.data == null">
          <q-item clickable tag="a" href="/">
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" href="/login">
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style></style>

<script setup>
// console.log("Login:" + process.env.VUE_APP_API_KEY);

// import { useStore } from "vuex";
import { ref } from "vue";
// import DashboardPage from "./views/DashboardPage.vue";

import { useStore } from "vuex";
import { auth } from "./firebaseConfig";
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

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToHome() {
  router.push("/");
}

const logOut = async () => {
  await store.dispatch("logOut");
  router.push("/");
};
</script>
