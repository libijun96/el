// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入公共样式和js
import './common/css/base.css'
import './common/js/base.js'
import './common/css/animate.min.css'

// 引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
