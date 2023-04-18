import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import tooltipDirewctive from '@/derectives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import Loader from '@/components/app/Loader'
import vuetify from './plugins/vuetify'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)
Vue.directive('tooltip', tooltipDirewctive)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
 