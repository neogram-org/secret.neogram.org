import { createStore } from "vuex";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const store = createStore({
  state: {
    user: {
      authStatus: false,
      data: null,
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  mutations: {
    SET_USER(state, payload) {
      state.user.data = payload;
    },
    SET_AUTH_STATUS(state, value) {
      state.user.authStatus = value;
    },
  },

  actions: {
    async register(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        console.log("*******");
        console.log(response);
        console.log("-------");
        context.commit("SET_USER", response.user);
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("SET_USER", response.user);
      } else {
        throw new Error("login failed");
      }
    },

    async getLoggedInUser(context, user) {
      context.commit("SET_AUTH_STATUS", user !== null);
      if (user) {
        context.commit("SET_USER", {
          email: user.email,
        });
      } else {
        context.commit("SET_USER", null);
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
    },
  },
});

export default store;
