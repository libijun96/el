import Vue from 'vue'
import Router from 'vue-router'
// 导入各组件
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Sellers from '@/components/sellers/Sellers'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      // 用户一进来就会是商品页面，所以要重定向到goods
      redirect:'/goods'
    },
    {
      path:'/goods',
      name:'goods',
      component:Goods,
    },
    {
      path:'/ratings',
      name:'ratings',
      component:Ratings
    },
    {
      path:'/sellers',
      name:'sellers',
      component:Sellers
    },
  ]
})
