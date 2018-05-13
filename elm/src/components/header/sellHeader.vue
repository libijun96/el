<template>
    <div id="header">
        <div class="seller-con">
            <img :src="s.avatar" alt="商家图片" class="seller-img"/>
            <div class="word">
                <div><img src="../../common/image/brand@2x.png" alt="品牌"/><span>{{s.name}}</span></div>
                <div>{{s.description}}/{{s.deliveryTime}}分钟到达</div>
                <div><span class="type type0"></span><span>{{s.supports[0].description}}</span></div>
            </div>
        </div>
        <div class="gongg" @click="showDetail"><img src="../../common/image/bulletin@2x.png" alt="公告">{{s.bulletin}}</div>
        <div class="back"><img :src="s.avatar" alt="商家头像"></div>
        <!-- 弹出层 -->
        <transition name="fade">
            <div class="details" v-if="isShow">
                <h1 class="title">{{s.name}}</h1>
                <star :score="s.score"></star>
                <div class="small-title"><p></p><h4>优惠信息</h4><p></p></div>
                <ul class="yh-m">
                    <li v-for="su in s.supports" :key="su.type">
                        <span class="type" :class="'type'+su.type"></span>
                        <p>{{su.description}}</p>
                    </li>
                </ul>
                <div class="small-title"><p></p><h4>商家公告</h4><p></p></div>
                <p class="lgg">{{s.bulletin}}</p>
                <span class="icon-close close-ditail" @click="hideDetail"></span>
            </div>
        </transition>
    </div>
</template>

<script>
import Star from '@/components/star/Star'
    export default {
        name:'sellHeader',
        components:{
            Star,
        },
        props:{
            s:{
                type:Object,
            }
        },
        data(){
            return {
                isShow:false,
            }
        },
        methods:{
            showDetail(){
                this.isShow=true;
            },
            hideDetail(){
                this.isShow=false;
            }
        }
    }
</script>

<style>
    /* 不要写scoped,这样样式不能应用到子组件上面 */
    #header{
        position: relative;
        /* 如果父级元素设置了transform属性，position:relative/absolute/fixed会基于此定位 */
        /* transform:translate(0,0); */
        width:100%;
        background-color:rgba(7,17,27,.5);
        color:#fff;
        font-weight:200;
        box-sizing:border-box;
    }
    /* 对应活动对应的小图 */
    .details .type{
        width:.32rem;
        height:.32rem;
        margin-right:.12rem;
        background-size:100% 100%;
    }
    #header .type0{
        background-image:url(../../common/image/decrease_1@2x.png);
    }
    #header .type1{
        background-image:url(../../common/image/discount_1@2x.png);
    }
    #header .type2{
        background-image:url(../../common/image/discount_1@2x.png);
    }
    #header .type3{
        background-image:url(../../common/image/invoice_2@3x.png);
    }
    #header .type4{
        background-image:url(../../common/image/guarantee_1@2x.png);
    }
    .seller-con{
        display:flex;
        padding:.48rem 0 .36rem .48rem;
    }
    .seller-con .seller-img{
        width:1.28rem;
        height:1.28rem;
        margin-right:.3rem;
        border-radius:.04rem;
    }
    .word>div:first-child{
        margin-bottom:.16rem;
        font-size:.32rem;
        font-weight:bold;
        line-height:.36rem;
    }
    .word>div:first-child>img{
        height:.36rem;
        margin-right:.12rem;
        vertical-align:middle;
    }
    .word>div:nth-child(2){
        margin-bottom:.2rem;
        font-size:.24rem;
        line-height:.24rem;
    }
    .word>div:nth-child(3) .type{
        display:inline-block;
        vertical-align:middle;
    }
    .gongg{
        width:100%;
        height:.56rem;
        padding:0 .24rem;
        line-height:.56rem;
        background-color:rgba(7,17,27,.2);
        font-size:.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing:border-box;
    }
    .gongg>img{
        width:.6rem;
        margin-right:.12rem;
        vertical-align:middle;
    }
    .back{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:-2;
        filter:blur(10px);
    }
    .back>img{
        width:100%;
        height:100%;
    }
    .details{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        box-sizing:border-box;
        padding:1.28rem .72rem .64rem;
        background-color:rgba(7,17,27,.8);
        overflow:auto;
        z-index:200;
    }
    .details .title{
        margin-bottom:.8rem;
        font-size:.32rem;
        font-weight:700;
        line-height:.32rem;
        text-align:center;
    }
    .details .stargroup{
        margin-bottom:.56rem;
        text-align:center;
    }
    .details .stargroup .star{
        margin-right: .24rem;
        width: .48rem;
        height: .48rem;
    }
    .details .stargroup .staron{
        background-image: url(../../common/image/star48_on@2x.png);
    }
    .details .stargroup .starhalf{
        background-image: url(../../common/image/star48_half@2x.png);
    }
    .details .stargroup .staroff{
        background-image: url(../../common/image/star48_off@2x.png);
    }
    .small-title{
        display:flex;
        margin-bottom:.48rem;
        align-items:center;
    }
    .small-title>p{
        width:2.24rem;
        height:1px;
        background-color:rgba(255,255,255,.2);
    }
    .small-title>h4{
        margin:0 .2rem;
        font-weight:700;
    }
    .yh-m{
        margin-bottom:.8rem;
    }
    .yh-m>li{
        display:flex;
        margin-bottom:.24rem;
        font-size:.24rem;
        line-height:.24rem;
    }
    .lgg{
        font-size:.24rem;
        line-height:.48rem;
    }
    .close-ditail{
        display:block;
        width:.64rem;
        margin:1rem auto .64rem;
        font-size:.64rem;
        color:rgba(255,255,255,.5);
    }
    .fade-enter,
    .fade-leave-to{
        opacity:0;
    }
    .fade-enter-active,
    .fade-leave-active{
        transition:opacity .5s;
    }
</style>