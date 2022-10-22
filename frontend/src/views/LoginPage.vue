<template>
  <div>
    <q-form class="container" @submit="Login">
      <h4>Login</h4>
      <p>
        <q-input outlined type="text" placeholder="Email" v-model="email" />
      </p>
      <p>
        <q-input
          outlined
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </p>
      <p><q-btn push color="primary" @click="Login">Submit</q-btn></p>
    </q-form>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

const Login = () => {
  console.log("Login:" + process.env.VUE_APP_API_KEY);

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log(data);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
