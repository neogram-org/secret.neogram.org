<template>
  <div v-if="isUser">
    <q-form class="container" @submit="SendMessage">
      <q-input outlined type="text" placeholder="Message" v-model="msg" />

      <q-btn @click="SendMessage" class="btn">Send</q-btn>
    </q-form>
  </div>
  <div v-else>User does not exist!!</div>
</template>

<style>
.btn {
  margin: 5px;
}
.container {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";

const msg = ref("");
const messageCount = ref(0);

const users = ref([]);

const isUser = ref(false);

const userExists = async () => {
  var pathname = window.location.pathname;

  // Removing /message/ & getting the userID
  var userID = pathname.slice(9);
  console.log(userID);

  await axios.get("http://localhost:3000/users").then((res) => {
    users.value = JSON.parse(JSON.stringify([...res.data]));
    // console.log(users.value[0].userID)
  });

  for (let i = 0; i < users.value.length; i++) {
    console.log(users.value[i]);
    if (userID == users.value[i].userID) {
      isUser.value = true;
    }
  }

  console.log(isUser.value);
};

userExists();

// onMounted(() => {});

const SendMessage = async () => {
  await axios.get("http://localhost:3000/messages").then((res) => {
    messageCount.value = res.data;
    console.log(messageCount);
  });

  await axios
    .post("http://localhost:3000/messages", {
      id: messageCount.value.length + 1,
      message: msg.value,
      date: Date.now(),
    })
    .then(() => {
      router.push("/");
    });
};
</script>
