import Vue from 'vue'
import App from './App.vue'
//import jQuery from 'jquery'
import vuetify from './plugins/vuetify';
//global.jquery = jQuery
//global.$ = jQuery
//window.$ = window.jQuery = require('jquery')

Vue.config.productionTip = false

import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyA5_gRFAyy1fpJVlJvDm4WX78jLLzfxMNc",
    authDomain: "ramenlove.firebaseapp.com",
    projectId: "ramenlove",
    storageBucket: "ramenlove.appspot.com",
    messagingSenderId: "493428016101",
    appId: "1:493428016101:web:6b033deb73731d8a38250c",
    measurementId: "G-DC7PF0JSGM"
  };
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
