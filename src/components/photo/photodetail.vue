<template>
    <div class="tmpl">
        <!--  组件名navBar -->  
        <nav-bar title="图片详情"></nav-bar>
        <!-- 组件名:navbar -->
        <!--  使用：navbar-->
        <div class="photo-title">
            <p v-text="imgInfo.title"></p>
            <span>发起日期：{{imgInfo.add_time | converDate}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(img,index) in imgs"  :key="index"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <!-- <img :src="img.src"> -->
                 <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)">
            </li>
           
        </ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>
        
        <!-- 使用评论子组件 -->
        <comment :cid="57"></comment>
        <!-- <comment :cid="pid"></comment> -->

    </div>
</template>
<script>
export default {
    data(){
        return {
            imgs:[],//存放缩率图
            imgInfo:{},//详情数据对象
            cid:this.$route.params.id,
        }
    },
    created(){
        // 获取路由参数
        // let pid =  this.$route.params.id;
        // 获取详情
        this.$ajax('getImgInfo.json').then(res=>{
            console.log(res);
            console.log('详情数据pid='+this.cid)
            this.imgInfo = res.data.message[0];
        })
        .catch(err=>{
            console.log(err);
        })
        // 获取图片
        this.$ajax('getthumimages.json').then(res=>{
            console.log(res);
            console.log('缩略图pid='+this.cid)
            this.imgs = res.data.message;
            this.imgs.forEach((ele)=>{
                ele.w=600;
                ele.h=400;
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}


</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}



</style>
