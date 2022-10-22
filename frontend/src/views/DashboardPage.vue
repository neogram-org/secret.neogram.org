<template>
  <p>
    {{ user.data != null ? "Welcome, " + user.data.name : "Please login" }}
  </p>

  <div v-if="user.data" class="tableDiv">
    <table>
      <tr>
        <th>Date</th>
        <th>Message</th>
      </tr>
      <tr v-for="message in messages" :key="message">
        <td>{{ new Date(message.date).toDateString() }}</td>
        <td>{{ message.message }}</td>
      </tr>
    </table>
  </div>

  <div v-else></div>
  <!-- <q-btn @click="show = !show" >Show Messages</q-btn> -->
  <!-- <h2 id= "10"> -->
  <!-- <p v-if="show"> {{messages}} </p> -->

  <!-- </h2> -->
</template>

<style>
/* .green {
  background: #28a745;
} */
p {
  margin-left: 5px;
  margin-top: 5px;
}
.tableDiv {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
}
th,
td {
  padding: 10px;
  border: 1px solid black;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { auth } from "../firebaseConfig";
import { computed } from "vue";
import axios from "axios";

const store = useStore();

var messages = ref([]);
// var show = false;
auth.onAuthStateChanged((user) => {
  store.dispatch("getLoggedInUser", user);
});

const user = computed(() => {
  console.log(store.getters.user);
  return store.getters.user;
});

const getData = async () => {
  await axios.get("http://localhost:3000/messages").then((res) => {
    messages.value = [...res.data];
  });
};

getData();
// console.log(messages)

onMounted(() => {});

// const showMessage =  () => {
// }

// const logOut = async () => {
//   await store.dispatch("logOut");
//   router.push("/");
// };
</script>
