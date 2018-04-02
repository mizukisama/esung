import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from './homeStore'
import cartStore from './cartStore'
import goodsStore from './goodsStore'
import myStore from './myStore'
import detailStore from './detailStore'
import orderStore from './orderStore'
import payStore from './payStore'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
      home:homeStore,
      cart:cartStore,
      goods: goodsStore,
      my:myStore,
      detail: detailStore,
      order: orderStore,
      pay:payStore,
  }
});