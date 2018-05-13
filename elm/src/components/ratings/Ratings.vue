<template>
    <div ref="ratings" id="rating-wrapper">
        <div id="r-box">
            <div class="des">
                <div>
                    <p>{{s.score}}</p>
                    <p>综合评分</p>
                    <p>高于周边商家{{s.rankRate}}%</p>
                </div>
                <ul>
                    <li><span>服务态度</span><star :score="s.serviceScore"></star><span class="sc">{{s.serviceScore}}</span></li>
                    <li><span>食物评分</span><star :score="s.foodScore"></star><span class="sc">{{s.foodScore}}</span></li>
                    <li>送达时间<span class="ti">{{s.deliveryTime}}分钟</span></li>
                </ul>
            </div>
            <div class="content">
                <ul>
                    <li @click="showAll">全部 {{allR.length}}</li>
                    <li @click="showLike">满意 {{like}}</li>
                    <li @click="showDis">不满意 {{allR.length-like}}</li>
                </ul>
                <div v-for="(ac,i) in allR" :key="i" v-if="showWhat">
                    <img :src="ac.avatar" alt="买家头像" class="tx">
                    <ul>
                        <li class="mt"><span>{{ac.username}}</span><span>{{ac.rateTime}}</span></li>
                        <li><star :score="ac.score"></star><span v-if="ac.deliveryTime!=''" class="sd">{{ac.deliveryTime}}分钟送达</span></li>
                        <li>{{ac.text}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入滚动插件
    import BScroll from 'better-scroll';
    import Star from '@/components/star/Star'
    export default {
        name:'ratings',
        components:{
            Star,
        },
        data(){
            return {
                showWhat:true,
            }
        },
        props:{
            s:{
                type:Object,
            },
            r:{}
        },
        methods:{
            showAll(){
                this.showWhat=true;
            },
            showLike(){
                this.showWhat='ac.rateType==0';
            },
            showDis(){
                this.showWhat='ac.rateType==1';
            },
            // 绑定滚动
            _initScroll(){
                //this.$refs vue提供的Dom对象接口
                this.ratingScroll = new BScroll(this.$refs.ratings, {
                    click: true
                });
            },
        },
        computed:{
            allR(){
                var a=[];
                [...this.r].forEach(el=> {
                    if(el.text!=""){
                        a.push(el);
                    }
                });
                return a;
            },
            like(){
                var b=[];
                this.allR.forEach(el=>{
                    if(el.rateType==0){
                        b.push(el);
                    }
                })
                return b.length;
            },
        },
        created(){
            // 获取成功数据以后再渲染DOM节点
            this.$nextTick( ()=> {
                this._initScroll();
            })
        },
        watch:{
            showWhat(){
                console.log(this.showWhat);
            }
        },
    }
</script>

<style>
    #rating-wrapper{
        width:100%;
        position: absolute;
        top: 3.55rem;
        bottom: 1.1rem;
        overflow: hidden;
    }
    .des{
        display:flex;
        padding:.36rem 0;
        text-align:center;
        font-size:.2rem;
        background-color:#fff;
        box-sizing:border-box;
    }
    .des>div{
        flex:3;
        text-align:center;
        border-right:1px solid rgb(220, 221, 221);
    }
    .des>div>p:first-child{
        font-size:.48rem;
        color:rgb(255,153,0);
        margin-bottom:.2rem;
    }
    .des>div>p:last-child{
        color:rgb(147,153,159);
        margin-top:.16rem;
    }
    .des>ul{
        flex:4;
        margin:0 .3rem;
    }
    .des>ul>li{
        display:flex;
        margin-bottom:.16rem;
    }
    .des>ul>li .sc{
        color:rgb(255,153,0);
    }
    .des>ul>li .ti{
        color:rgb(147,153,159);
        margin:0 .24rem;
    }
    .des .stargroup{
        margin:-.05rem .24rem 0;
    }
    .des .stargroup .star{
        width: .36rem;
        height: .36rem;
    }
    .des .stargroup .staron{
        background-image: url(../../common/image/star36_on@2x.png);
    }
    .des .stargroup .starhalf{
        background-image: url(../../common/image/star36_half@2x.png);
    }
    .des .stargroup .staroff{
        background-image: url(../../common/image/star36_off@2x.png);
    }
    .content{
        margin-top:.32rem;
        background-color:#fff;
        padding:0 .36rem;
        box-sizing:border-box;
    }
    .content>ul{
        display:flex;
        padding:.36rem 0;
        border-bottom:1px solid #ccc;
    }
    .content>ul>li{
        width:1.6rem;
        height:.6rem;
        margin-right:.24rem;
        text-align:center;
        line-height:.6rem;
        color:#333;
    }
    .content>ul>li:nth-child(1){
        background-color:#00a0dc;
        color:#fff;
    }
    .content>ul>li:nth-child(2){
        background-color:#ccecf8;
    }
    .content>ul>li:last-child{
        background-color:#e9ebec;
    }
    .content>div{
        display:flex;
        padding:.36rem 0;
    }
    .content>div>ul{
        flex:auto;
    }
    .content>div>ul>li{
        margin-bottom:.12rem;
    }
    .mt{
        display:flex;
        justify-content:space-between;
    }
    .content>div>ul>li:nth-child(2){
        display:flex;
    }
    .content>div>ul>li:nth-child(3){
        line-height:.36rem;
    }
    .content>div .tx{
        width:.48rem;
        height:.48rem;
        margin-right:.24rem;
        border-radius:50%;
    }
    .content>div .sd{
        color:rgb(147,153,159);
        margin-left:.24rem;
    }
    .content li .stargroup .star{
        width: .24rem;
        height: .24rem;
    }
    .content li .stargroup .staron{
        background-image: url(../../common/image/star24_on@2x.png);
    }
    .content li .stargroup .starhalf{
        background-image: url(../../common/image/star24_half@2x.png);
    }
    .content li .stargroup .staroff{
        background-image: url(../../common/image/star24_off@2x.png);
    }
</style>