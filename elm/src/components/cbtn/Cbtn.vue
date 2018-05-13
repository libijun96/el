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
</style>
