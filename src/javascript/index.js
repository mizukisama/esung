// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
Vue.config.productionTip = false
// 在屏幕宽度为640px时  font-size: 设置为 100px;  6.4rem;
// 在屏幕宽度为320px时  font-size: 应该设置为50px;  

// 当前屏幕应当设置的font-size的值为:   当前屏幕宽度/640  * 100px;
// 进行rem适配工作
// document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 640 * 100}px`;
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://39.107.78.155:7777";
// axios.defaults.baseURL = "http://localhost:7777";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
