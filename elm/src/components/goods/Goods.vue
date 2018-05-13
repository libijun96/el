<template>
    <div id="box">
        <div ref="goodsMenu">
             <ul class="manu">
                <li v-for="(g,i) in gs" :key="i" :class="i==curIndex?'active':''" @click="chooseGoods(i)"><p><span v-if="g.type!=-1" class="type" :class="'type'+g.type"></span>{{g.name}}</p></li>
            </ul>
        </div>
        <div ref="goodsList">
            <div class="goodlist">
                <div v-for="(g,index) in gs" :key="index" class="lei-com">
                    <h4>{{g.name}}</h4>
                    <div v-for="(f,i) in g.foods" :key="i" class="com-co">
                        <img :src="f.image" alt="" class="com-img">
                        <div class="me">
                            <h5>{{f.name}}</h5>
                            <p>{{f.description}}</p>
                            <p>月售{{f.sellCount}}份  <span v-if="f.rating!=''">好评{{f.rating}}%</span></p>
                            <p>￥<span>{{f.price}}</span><del v-if="f.oldPrice!=''">￥{{f.oldPrice}}</del></p>
                            <cbtn :g="f"></cbtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入滚动插件
    import BScroll from 'better-scroll';
    import cbtn from '@/components/cbtn/Cbtn'

    export default {
        name:'goods',
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
                liHeight:[0],//左侧商品滚动的高度
                scrollY:0//记录右侧滚动高度
            }
        },
        computed:{
            // 根据右侧商品滚动的高度去计算左侧应该是哪一个menu为activa,两者之间形成一个关系映射
            curIndex(){
                for(let i=0;i<this.liHeight.length;i++){//循环到最后一项ht2会没有值，不做判断
                    var ht1=this.liHeight[i];
                    var ht2=this.liHeight[i+1];
                    if(!ht2||(this.scrollY>=ht1&&this.scrollY<ht2)){
                        return i;
                    }
                }
            }
        },
        methods:{
            // 绑定滚动
             _initScroll(){
                //  console.log(this.$refs.goodsMenu);
                //this.$refs vue提供的Dom对象接口
                this.menuScroll = new BScroll(this.$refs.goodsMenu, {
                    click: true
                });
                this.goodsScroll = new BScroll(this.$refs.goodsList, {
                    click: true,
                    //探针作用，实时监测滚动位置
                    probeType:3
                });
                // 滚动事件，获取滚动高度
                this.goodsScroll.on('scroll',(pos)=>{
                    // console.log(pos.y);
                    this.scrollY=Math.abs(Math.round(pos.y));
                });
            },
            // 计算每一大类商品的高度
            _calHeight(){
                var aCom=this.$refs.goodsList.getElementsByClassName("lei-com");
                var ht=0;
                [...aCom].forEach((val)=>{
                    ht+=val.offsetHeight;
                    this.liHeight.push(ht);
                });
            },
            // 左侧点击联动
            chooseGoods(i){
                // 点击左边，右侧相应滚动
                var aCom=this.$refs.goodsList.getElementsByClassName("lei-com");
                this.goodsScroll.scrollToElement(aCom[i],300);
                //300是滚动时间
            },
        },
        created(){
            // 获取成功数据以后再渲染DOM节点
                this.$nextTick( ()=> {
                this._initScroll();
                // 初始化时就计算好每类商品的高度
                this._calHeight();
            })
        }
    }
</script>

<style>
    #box{
        /* 固定两个滚动部分的高度 */
        position: absolute;
        top: 3.55rem;
        bottom: 1.1rem;
        overflow: hidden;
        display:flex;
        background-color:#f3f5f7;
    }
    .manu{
        width:1.8rem;
        border-right:2px solid #d9dde1;
    }
    .manu>li{
        display:table;
        width:100%;
        padding:0 .24rem;
        box-sizing:border-box;
    }
    .manu>li.active{
        background-color:#fff;
        color:rgb(0,160,220);
    }
    .manu>li>p{
        /* 使用表格布局实现垂直居中 */
        display:table-cell;
        height:1.08rem;
        vertical-align:middle;
        border-bottom:1px solid rgba(7,17,27,.1);
    }
    /* type码对应的小图 */
    .type{
        display:inline-block;
        width:.32rem;
        height:.32rem;
        margin-right:.05rem;
        vertical-align:middle;
        background-size:100% 100%;
    }
    .type2,
    .type1{
        background-image:url(../../common/image/special_3@2x.png);
    }

    .goodlist{
        flex:auto;
    }
    .goodlist h4{
        margin-left:.28rem;
        line-height:.58rem;
        font-size:.24rem;
        color:rgb(147,153,159);
    }
    .goodlist .com-co{
        position: relative;
        display:flex;
        margin-left:-2px;
        padding:.36rem;
        box-sizing:border-box;
        background-color:#fff;
        color:rgb(7,17,27);
        border-bottom:1px solid rgba(7,17,27,.1);
    }
    .goodlist .com-co .com-img{
        width:2rem;
        height:2rem;
        margin-right:.2rem;
        border-radius:.05rem;
    }
    .goodlist .com-co .me>h5{
        margin-bottom:.2rem;
        font-size:.28rem;
        line-height:.3rem;
    }
    .goodlist .com-co .me>p:nth-child(2),
    .goodlist .com-co .me>p:nth-child(3){
        margin-bottom:.2rem;
        font-size:.2rem;
        line-height:.28rem;
        color:rgb(147,153,159);
    }
    .goodlist .com-co .me>p:nth-child(2){
        margin-bottom:0.1rem;
        line-height:.4rem;
    }
    .goodlist .com-co .me>p:nth-child(4){
        margin-bottom:.2rem;
        color:red;
    }
    .goodlist .com-co .me>p:nth-child(4)>span{
        margin-right:.16rem;
        font-size:.32rem;
    }
    .goodlist .com-co .me>p:nth-child(4)>del{
        color:rgb(147,153,159);
    }
    .goodlist .com-co .btn{
        position: absolute;
        bottom: .2rem;
        right: .2rem;
    }
</style>