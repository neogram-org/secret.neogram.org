<template>
  <div>
    <q-form class="container" @submit="Login">
      <q-input outlined type="text" placeholder="Message" v-model="msg" />

      <q-btn @click="SendMessage" class="btn">Send</q-btn>
    </q-form>
  </div>
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
