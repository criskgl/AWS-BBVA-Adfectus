import Vue from 'vue'
import App from './App'
import { router } from './routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueGraph from 'vue-graph'
import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

Vue.use(VueGraph)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')