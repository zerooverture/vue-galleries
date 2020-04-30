import Vue from 'vue'
import App from './app'
import VueGalleries from '../../src/index'

Vue.use(VueGalleries)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
