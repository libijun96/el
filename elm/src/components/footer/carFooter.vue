<template>
    <div id="car-box">
        <div class="count-car">
            <div class="circle" @click="slideAlready">
                <div :class="totalCount>0?'active':''"><span class="icon-shopping_cart"></span></div>
                <div class="rt" v-if="totalCount>0">{{totalCount}}</div>
            </div>
            <span class="totalprice">￥{{totalPrice}}</span>
            <span>另需配送费￥{{s.deliveryPrice}}</span>
            <span class="sub" :class="totalPrice>=20?'active':''" >{{s.minPrice}}元起送</span>
        </div>
        <!-- 清单 -->
        <transition name="slider"
                        enter-active-class="animated slideInUp"
                        leave-active-class="animated slideOutDown"
                        :duration="300"
            >
                <div class="list" v-show="isShow">
                    <div class="head"><span>购物车</span><span @click="removeAll">清空</span></div>
                    <div ref="blist" class="blist-wrapper">
                        <ul>
                            <li v-for="(c,index) in alreadyC" :key="index">
                                <span>{{c.name}}</span>
                                <span class="price">￥{{c.price}}</span>
                                <cbtn :g="c"></cbtn>
                            </li>
                        </ul>
                    </div>
                </div>
        </transition>
        <!-- 遮罩层 -->
        <transition name="fade">
            <div class="cover" v-if="isShow"></div>
        </transition>
    </div>
</template>

<script>    
    import cbtn from '@/components/cbtn/Cbtn'
    import BScroll from 'better-scroll';
    export default {
        name:'carFooter',
        components:{
            cbtn,
        },
        props:{
            s:{
                type:Object,
            },
            gs:{
                
            }
        },
        data(){
            return {
                isShow:false,
            }
        },
        methods:{
            slideAlready(){
                if(this.totalCount>0){
                    this.isShow=!this.isShow;
                }
            },
            removeAll(){
                [...this.gs].forEach((val)=>{
                    val.foods.forEach((e)=>{
                        e.count=0;
                    })
                });
            },
            // 绑定滚动
            _initScroll(){
                //this.$refs vue提供的Dom对象接口
                this.blistScroll = new BScroll(this.$refs.blist, {
                    click: true
                });
            },
        },
        watch:{
            totalCount(){
                if(this.totalCount<=0){
                    this.isShow=false;
                }
            },
        },
        computed:{
            totalCount(){
                var totalc=0;
                [...this.gs].forEach((val)=>{
                    val.foods.forEach((e)=>{
                        if(e.count){
                            totalc+=e.count;
                        }
                    })
                });
                return totalc;
            },
            totalPrice(){
                var totalp=0;
                [...this.gs].forEach((val)=>{
                    val.foods.forEach((e)=>{
                        if(e.count){
                            totalp+=e.price*e.count;
                        }
                    })
                });
                return totalp;
            },
            alreadyC(){
                var commodity=[];
                [...this.gs].forEach((val)=>{
                    val.foods.forEach((e)=>{
                        if(e.count){
                            commodity.push(e);
                        }
                    })
                });
                return commodity;
            },
        },
        created(){
            this.$nextTick( ()=> {
                this._initScroll();
            })
        },
    }
</script>

<style scoped>
    .count-car{
        display:flex;
        align-items:center;
        justify-content:space-between;
        position: fixed;
        bottom:0;
        left:0;
        height:1.1rem;
        width:100%;
        background-color:#141d27;
        color:rgba(255,255,255,.4);
        z-index:20;
    }
    .count-car .circle{
        position: relative;
        width:1.16rem;
        height:1.16rem;
        margin:-.4rem .36rem 0;
        border-radius:50%;
        background-color:#141d27;
    }
    .count-car .circle>div:first-child{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        width:.88rem;
        height:.88rem;
        margin:auto;
        text-align:center;
        border-radius:50%;
        background-color:#202932;
    }
    .count-car .circle>div:first-child.active{
        background-color:rgb(0,160,220);
        color:#fff;
    }
    .count-car .circle>div:first-child>span{
        line-height:.88rem;
        font-size:.5rem;
    }
    .count-car .circle .rt{
        position: absolute;
        right:0;
        top:0.1rem;
        width:.48rem;
        line-height:.32rem;
        font-size:.18rem;
        font-weight:500;
        background-color:red;
        border-radius:.12rem;
        color:#fff;
        text-align:center;
    }
    .count-car .totalprice{
        margin:0 -.64rem 0 -1.2rem;
        font-size:.42rem;
    }
    .count-car .sub{
        width:2.1rem;
        height:100%;
        line-height:1.1rem;
        text-align:center;
        background-color:rgba(255,255,255,.1);;
    }
    .count-car .sub.active{
        background-color:rgb(49, 170, 49);
        color:#fff;
    }
    #car-box .list{
        width:100%;
        height:4rem;
        position:absolute;
        bottom:0;
        left:0;
        color:rgb(7,17,27);
        background-color:#fff;
    }
    #car-box .list>div.head{
        display:flex;
        justify-content:space-between;
        height:.8rem;
        padding:0 .5rem;
        box-sizing:border-box;
        line-height:.8rem;
        background-color:#f3f5f7;
        border-bottom:1px solid rgba(7,17,27,.0);
    }
    #car-box .list>div.head>span:last-child{
        color:rgb(0,160,200);
    }
    #car-box .list .blist-wrapper{
        width:100%;
        height:3.2rem;
        overflow:hidden;
    }
    #car-box .list ul{
        width:100%;
        height:auto;
        padding-bottom:2rem;
    }
    #car-box .list ul>li{
        position: relative;
        width:100%;
        height:.96rem;
        line-height:.96rem;
        border-bottom:1px solid rgba(7,17,27,.1);
    }
    #car-box .list ul>li>span:first-child{
        position: absolute;
        left:6%;
    }
    #car-box .list ul>li .price{
        position: absolute;
        right:30%;
        color:red;
        font-size:.32rem;
    }
    #car-box .btn{
        position: absolute;
        right:6%;
        top:50%;
        margin-top:-.38rem;
    }
    .cover{
        position:absolute;
        top:0;
        bottom:4rem;
        width:100%;
        background-color:rgba(7,17,27,.6);
    }
    .fade-enter,
    .fade-leave-to{
        opacity:0;
    }
    .fade-enter-active,
    .fade-leave-active{
        transition:opacity .2s .15s;
    }
</style>