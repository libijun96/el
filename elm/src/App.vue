<template>
  <div id="app">
    <sell-header :s="seller"></sell-header>
    <div class="links">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/sellers">商家</router-link>
    </div>
    <!-- ！！！传值给Goods、Rating、Seller -->
    <router-view :s="seller" :gs="good" :r="rating"/>
    <car-footer :s="seller" :gs="good"></car-footer>
  </div>
</template>

<script>
// 引入公共样式函数
// import init from './common/js/base.js'

import sellHeader from '@/components/header/sellHeader'
import carFooter from '@/components/footer/carFooter'

export default {
  name: 'App',
  components:{
    sellHeader,
    carFooter,
  },
  data(){
    return {
      seller:{
        // vue2的一个新规定，若要获取的json数据是嵌套的，要预定义好
        supports:[
          {
            description:''
          }
        ]
      },
      good:{},
      rating:{}
    }
  },
  created(){
    // init();
    this.$http.get('/api/seller').then((res)=>{
      this.seller=res.body.data;
    },(res)=>{
      alert('网络走丢了！');
    });

    this.$http.get('/api/goods').then((res)=>{
      this.good=res.body.data;
    },(res)=>{
      alert('网络走丢了！');
    });

    this.$http.get('/api/ratings').then((res)=>{
      this.rating=res.body.data;
    },(res)=>{
      alert('网络走丢了！');
    });
  }
}
</script>

<style>
  .links{
    display:flex;
    width:100%;
    height:.8rem;
    line-height:.8rem;
    justify-content:space-around;
    background-color:#fff;
    border-bottom:1px solid rgba(7,17,27,.1);
  }
  .links a{
    color:rgb(77,85,93);
  }
  .links a.router-link-exact-active{
    color:rgb(240,20,20);
  }
</style>
