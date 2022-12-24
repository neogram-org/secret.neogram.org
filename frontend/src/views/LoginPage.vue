<template>
  <div class="container">
    <!-- <q-form class="container" @submit="Login"> -->
    <h4>Login</h4>
    <!-- <p>
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
      <p><q-btn push color="primary" @click="Login">Submit</q-btn></p> -->
    <p>
      <q-btn push class="btn" color="primary" @click="LoginWithGoogle"
        >Google</q-btn
      >
    </p>
    <!-- </q-form> -->
  </div>
</template>

<style>
.btn {
  margin-top: 20px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<script setup>
import { watch } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  // signInWithEmailAndPassword,
  // signInWithPopup,
} from "firebase/auth";

/// For using in email and passeword auth
// const email = ref("");
// const password = ref("");

const router = useRouter();
const auth = getAuth();
const store = useStore();

auth.onAuthStateChanged((user) => {
  store.dispatch("getLoggedInUser", user);
});

const user = computed(() => {
  return store.getters.user;
});

const LoginWithGoogle = () => {
  signInWithRedirect(auth, new GoogleAuthProvider());
};

watch(
  getRedirectResult(auth).then((data) => {
    console.log(user.value);
    if (data) {
      router.push("/");
    } else if (user.value.data != null) {
      router.push("/");
    }
  })
);

// const Login = () => {
//   console.log("Login:" + process.env.VUE_APP_API_KEY);

//   const auth = getAuth();
//   signInWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log(data);
//       router.push("/");
//     })
//     .catch((error) => {
//       console.log(error.code);
//       alert(error.message);
//     });
// };

</script>
