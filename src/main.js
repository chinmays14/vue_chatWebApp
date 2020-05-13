import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase'

// Moment
import moment from 'moment';
import VueMoment from 'vue-moment';

// Load Locales ('en' comes loaded by default)
require('moment/locale/es');

// Choose Locale
moment.locale('es');

Vue.use(VueMoment, { moment });
// Moment end

require("firebase/firestore");

//App's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyByV2vomqOyi2_GMh83O0xMMCsYUdtVZD8",
  authDomain: "chatapp-vuejs.firebaseapp.com",
  databaseURL: "https://chatapp-vuejs.firebaseio.com",
  projectId: "chatapp-vuejs",
  storageBucket: "chatapp-vuejs.appspot.com",
  messagingSenderId: "640062925407",
  appId: "1:640062925407:web:0117fc12f78fbfa272c9ea"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize cloud firestore through Firebase
var db = firebase.firestore();

window.db=db;

// // Disable depreceated features
// db.settings({
//   timestampsInSnapshots:true
// });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
