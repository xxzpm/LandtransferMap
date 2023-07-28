import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "./utils/element-ui.js"
import './utils/loadIpmapping.js'
import "./utils/request"
Vue.prototype.baseURL = process.env.VUE_APP_BASE_API;
console.log('process.env.VUE_APP_BASE_API')
console.log(process.env.VUE_APP_BASE_API)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
