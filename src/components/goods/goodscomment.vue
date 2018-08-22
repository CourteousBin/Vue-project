<template>
    <div class="tmpl">
        <nav-bar title="商品评论"></nav-bar>

        <comment :cid="$route.query.id"></comment>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                // id:this.$route.query.id,
            }
        },
        methods:{
           
        },
        created(){

        }
    }
</script>
<style scoped>

</style>