<template>
  <div>
    <q-form class="container" @submit="Register">
      <h4>Register</h4>
      <p>
        <q-input
          outlined
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
          v-model="email"
        />
      </p>

      <p>
        <q-input
          outlined
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
          v-model="password"
        />
      </p>

      <p>
        <q-btn color="primary" @click="Register" type="submit">Register</q-btn>
      </p>
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const store = useStore();
const router = useRouter();

const Register = async () => {
  try {
    await store.dispatch("register", {
      email: email.value,
      password: password.value,
    });
    router.push("/dashboard");
  } catch (err) {
    // TODO: Show error message in the UI
    console.log("Error" + err.message);
  }
};
</script>
