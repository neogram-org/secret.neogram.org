import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
// import { initializeApp } from "firebase/app";
import router from "./router";
import store from "./store";

const app = createApp(App);

// console.log(process.env.VUE_APP_API_KEY);

app.use(router);
app.use(Quasar, quasarUserOptions);
app.use(store);

app.mount("#app");
