<template>
    <div class="tmpl">
        <nav-bar title="图文分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="loadImg(category.id)">{{category.title}}</a>
                </li>
                
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name:'photo.detail',params:{id:img.id} }">
                         <img v-lazy="/api/+img.img_url">
                        <p>
                            <span v-text="img.title"></span>
                            <br>
                            <span v-text="img.zhaiyao"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            categorys:[],
            imgs:[]
        }
    },
    created(){
        // 发起请求
        this.$ajax.get('getimgcategory.json').then(res=>{
            console.log(res)
            this.categorys = res.data.message;
            // 将全部添加到数组第一位
            this.categorys.unshift({
                id:0,
                title:'全部'
            })

            // 默认全部 id = 0 获取全部图片数据
            // this.$ajax.get('getimages.json').then(res=>{
            //     console.log(res);
            //     this.imgs = res.data.message;
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
            this.loadImg(0);
        })
    },
    methods:{
        loadImg(id){
            console.log('进入Loadimg,传入id='+id)
            this.$ajax.get('getimages.json').then(res=>{
                console.log(res);
                this.imgs = res.data.message;
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}



</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

/*图片懒加载的样式*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

</style>
