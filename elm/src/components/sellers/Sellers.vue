<template>
    <div ref="seller" id="seller-wrapper">
        <div id="seller-box">
            <div class="tc">
                <div class="cd">
                    <div>
                        <p class="title">{{s.name}}</p>
                        <p class="ys"><star :score="s.score"></star><span>月售{{s.sellCount}}单</span></p>
                    </div>
                    <div class="collect">
                        <span class="icon-favorite" @click="select" :class="isRed?'active':''"></span>
                        <p v-if="isRed">已收藏</p><p v-else>收藏</p>
                    </div>
                </div>
                <ul>
                    <li><p>起送价</p><p><span>{{s.minPrice}}</span>元</p></li>
                    <li><p>商家配送</p><p><span>{{s.deliveryPrice}}</span>元</p></li>
                    <li><p>平均配送时间</p><p><span>{{s.deliveryTime}}</span>分钟</p></li>
                </ul>
            </div>
            <div class="activity">
                <h2>公告与活动</h2>
                <p>{{s.bulletin}}</p>
                <ul>
                    <li v-for="(fl,index) in s.supports" :key="index">
                        <span class="type" :class="'type'+fl.type"></span>
                        <span>{{fl.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="seller-view">
                <h2>商家实景</h2>
                <div ref="slideimg" class="img-wrapper">
                    <div>
                        <img v-for="(im,i) in s.pics" :key="i" :src="im" alt="商家实景">
                    </div>
                </div>
            </div>
            <div class="s-me">
                <h2>商家信息</h2>
                <ul>
                    <li v-for="(me,i) in s.infos" :key="i">{{me}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import Star from '@/components/star/Star'
    export default {
        name:'sellers',
        components:{
            Star,
        },
        data(){
            return {
                isRed:false,
            }
        },
        props:{
            s:{
                type:Object,
            }
        },
        methods:{
            select(){
                this.isRed=!this.isRed;
            },
            // 绑定滚动
            _initScroll(){
                //this.$refs vue提供的Dom对象接口
                this.sellerScroll = new BScroll(this.$refs.seller, {
                    click: true
                });
                this.slideimgScroll = new BScroll(this.$refs.slideimg, {
                    click: true,
                    scrollX: true,
                    scrollY: false,
                });
            },
        },
        created(){
            // 获取成功数据以后再渲染DOM节点
            this.$nextTick( ()=> {
                this._initScroll();
            })
        },
    }
</script>

<style>
    #seller-wrapper{
        width:100%;
        position: absolute;
        top: 3.55rem;
        bottom: 1.1rem;
        overflow: hidden;
    }
    .tc{
        padding:.36rem;
        margin-bottom:.32rem;
        background-color:#fff;
    }
    .cd{
        display:flex;
        box-sizing:border-box;
        justify-content:space-between;
        border-bottom:1px solid #e6e7e8;
    }
    .cd>div:nth-child(1)>p{
        margin-bottom:.16rem;
    }
    .cd .ys{
        display:flex;
    }
    .cd .ys>span{
        margin:.1rem .16rem;
        color:rgb(75,86,93);
        font-size:.2rem;
    }
    .cd .stargroup .star{
        width: .36rem;
        height: .36rem;
    }
    .cd .stargroup .staron{
        background-image: url(../../common/image/star36_on@2x.png);
    }
    .cd .stargroup .starhalf{
        background-image: url(../../common/image/star36_half@2x.png);
    }
    .cd .stargroup .staroff{
        background-image: url(../../common/image/star36_off@2x.png);
    }
    .cd .collect{
        text-align:center;
    }
    .cd .collect>span{
        font-size:.48rem;
        color:#d4d6d9;
    }
    .cd .collect>span.active{
        color:rgb(240,20,20);
    }
    .cd .collect>p{
        margin-top:.1rem;
        color:rgb(75,86,93);
        font-size:.2rem;
    }
    .tc>ul{
        display:flex;
        padding-top:.36rem;
        box-sizing:border-box;
    }
    .tc>ul>li{
        flex:1;
        text-align:center;
    }
    .tc>ul>li:nth-child(2){
        border-left:1px solid #e6e7e8;
        border-right:1px solid #e6e7e8;
    }
    .tc>ul>li>p:first-child{
        margin-bottom:.16rem;
        color:rgb(147,153,159);
    }
    .tc>ul>li>p:last-child>span{
        font-size:.48rem;
    }
    .activity{
        padding:.36rem .36rem 0;
        margin-bottom:.32rem;
        box-sizing:border-box;
        background-color:#fff;
    }
    #seller-box h2{
        margin-bottom:.2rem;
        font-size:.36rem;
        font-weight:500;
    }
    .activity>p{
        margin-bottom:.32rem;
        font-size:.24rem;
        color:rgb(240,20,20);
        line-height:.48rem;
    }
    .activity ul>li{
        padding:.32rem .24rem;
        box-sizing:border-box;
        border-top:1px solid rgba(7,17,27,.1);
        line-height:.32rem;
    }
    .activity ul>li .type{
        display:inline-block;
        width:.32rem;
        height:.32rem;
        margin-right:.12rem;
        background-size:100% 100%;
        vertical-align:middle;
    }
    .activity ul>li .type0{
        background-image:url(../../common/image/decrease_4@2x.png);
    }
    .activity ul>li .type1{
        background-image:url(../../common/image/discount_4@2x.png);
    }
    .activity ul>li .type2{
        background-image:url(../../common/image/special_4@2x.png);
    }
    .activity ul>li .type3{
        background-image:url(../../common/image/invoice_4@2x.png);
    }
    .activity ul>li .type4{
        background-image:url(../../common/image/guarantee_4@3x.png);
    }
    .seller-view{
        padding:.36rem;
        margin-bottom:.32rem;
        box-sizing:border-box;
        background-color:#fff;
    }
    .seller-view>div.img-wrapper{
        width:100%;
        overflow:hidden;
    }
    .seller-view>div.img-wrapper>div{
        display:flex;
        width:17rem;
    }
    .seller-view img{
        width:4.5rem;
        margin-right:.12rem;
    }
    .s-me{
       padding:.36rem;
       box-sizing:border-box;
       background-color:#fff;
    }
    .s-me ul>li{
        padding:.32rem .24rem;
        box-sizing:border-box;
        border-top:1px solid rgba(7,17,27,.1);
        line-height:.32rem;
    }
</style>