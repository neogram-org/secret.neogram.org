import { createStore } from "vuex";
import { auth, provider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  // signInWithPopup,
  signInWithRedirect,
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

    async LoginWithGoogle(context) {
      await signInWithRedirect(auth, provider);

      await getRedirectResult(auth)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = provider.credentialFromResult(result);
          // const token = credential.accessToken;
          // // The signed-in user info.
          const user = result.user;

          console.log("store");
          console.log(user);

          context.commit("SET_USER", user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // // The email of the user's account used.
          // const email = error.customData.email;
          // // The AuthCredential type that was used.
          // const credential = provider.credentialFromError(error);
          // ...

          // console.log(errorCode + errorMessage + email + credential)
        });
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
          name: user.displayName,
          photo: user.photoURL,
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
