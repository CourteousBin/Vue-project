<template>
    <div>
        
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></a>
            <h1 class="mui-title">{{title}}</h1>
        </header>

    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        methods:{
           goBack(){
            this.$router.go(-1);    // 根据浏览器记录返回上一次
           }
        },
        props:['title'],    // 接受父组件参数
    }
</script>
<style scoped>
.mui-bar.mui-bar-nav {
    position: relative;
}
</style>