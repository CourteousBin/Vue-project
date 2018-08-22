<template>
    <div>
        
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.url"><img :src="img.img"></a></mt-swipe-item>
        </mt-swipe>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[],
            }
        },
        methods:{
           goBack(){
            this.$router.go(-1);    // 根据浏览器记录返回上一次
           }
        },
        props:['url'],    // 接受父组件参数
        created(){
            this.$ajax.get(this.url)
            .then(res=>{
                this.imgs = res.data.message;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
</script>
<style scoped>
/*轮播图样式*/
.mint-swipe{
    max-height:187px; 
}
.mint-swipe img {
    height: 100%;
}
</style>