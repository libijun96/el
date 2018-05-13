<template>
    <div class="btn">
        <span class="cer icon-remove_circle_outline" v-show="g.count>0" @click="minusCount(g)"></span>
        <span class="count" v-show="g.count>0">{{g.count}}</span>
        <span class="cer icon-add_circle" @click="addCount(g)"></span>
    </div>
</template>

<script>
    export default {
        name:'Cbtn',
        props:{
            g:{},
            b:0
        },
        methods:{
            minusCount(obj){
                obj.count--;
                this.$set(this.g,'count', obj.count);
            },
            addCount(obj){
                this.$set(this.g,'count', obj.count);
                if(obj.count==undefined){
                    obj.count=0;
                }
                obj.count++;
            },
         },
    }
</script>

<style scoped>
    .cer{
        font-size:.48rem;
        color:rgb(0,160,200);
    }
    .count{
        display:inline-block;
        width:.38rem;
        text-align:center;
        font-size:.20rem;
        color:rgb(147,153,159);
        transform:translateY(-5px);
    }
    .ball{
        position: fixed;
        left: 0px;
        bottom:3rem;
        z-index: 1000;
        /*贝塞尔曲线*/
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); 
        border:1px solid red;
    }
    .inner{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0,160,220);
        transition: all 0.4s linear;
    }
</style>