import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Goods from '../pages/goods'
import Cart from '../pages/cart'
import My from '../pages/my'
import Pay from '../pages/pay'
import Detail from '../pages/detail'
import Order from '../pages/order'
Vue.use(Router)
export default new Router({
  // mode:"history",
  routes: [
    {
      path: '/',
      redirect: {name:'home'}
    },
    {
      path:'/home',
      name:'home',
      component:Home,
    },
    {
      path:'/goods',
      name:'goods',
      component: Goods,
    },
    {
      path:'/cart',
      name:'cart',
      component: Cart,
    },
    {
      path:'/my',
      name:'my',
      component: My,
    },
    {
      path:'/order',
      name:'order',
      component: Order,
    },
    {
      path:'/detail/:goodsID',
      name:'detail',
      component: Detail,
    },
    {
      path: '/pay/:orderCode',
      name: 'pay',
      component: Pay,
    },
    {
      path: '*',
      name: 'error',
      redirect: { name: 'home' }
    }
    ]
})
