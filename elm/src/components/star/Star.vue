<template>
    <div class="stargroup">
        <!-- 黄色星星 -->
        <span v-if="staron>0">
            <span class="star staron" v-for="a in staron" :key="a"></span>
        </span>
        <!-- 半颗星星 -->
        <span class="star starhalf" v-if="starhalf"></span>
        <!-- 灰色星星 -->
        <span v-if="staroff>0">
            <span class="star staroff" v-for="a in staroff" :key="a"></span>
        </span>
    </div>
</template>

<script>
    export default {
        name:'star',
        props:{
            score:''
        },
        // 计算三种星星的个数
        computed:{
            staron(){
                return Math.floor(this.score);
            },
            starhalf(){
                if(this.score*10%10>=5){
                    return true;
                }else{
                    return false;
                }
            },
            staroff(){
                if(this.starhalf){
                    return 4-this.staron;
                }else{
                    return 5-this.staron;
                } 
            }
        },
    }
</script>

<style scoped>
    .stargroup .star{
        display: inline-block;
        background-size: 100% 100%;
    }
</style>