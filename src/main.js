import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
import vuetify from './plugins/vuetify';
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
