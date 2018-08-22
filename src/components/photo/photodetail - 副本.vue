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
        <!-- <comment :cid="pid"></comment> -->
        
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span>
                            <a @click="goBack">返回</a>
                        </span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea name="" id="" v-model="msg"></textarea>
                </li>
                <li>
                    <mt-button size="large" type="primary" @click="sendComent()">发表评论</mt-button>
                </li>
                <li class="pthoto-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}:{{comment.conent}} {{comment.add_time | converDate}}
                </li>
            </ul>
            <mt-button size="large" type="danger" @click="laodByPage()" plain>加载更多</mt-button>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return {
            imgs:[],//存放缩率图
            imgInfo:{},//详情数据对象
            pid:this.$route.params.id, //记录当前图片id
            comments:[],
            pageIndex:1,// 页码
            cid:this.$route.params.id,
            msg:'',
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

        // 评论操作开始
        this.loadFirst();
    },
    methods:{
        loadFirst(){
            console.log("评论数据传入id="+this.cid);
            this.$ajax.get('getcomments.json')
            .then(res=>{
                console.log(res);
                this.comments = res.data.message;
            })
            .catch(err=>{
                console.log(err)
            })
        },
        laodByPage(){
            console.log("评论数据传入id="+this.cid+',页码是:'+(++this.pageIndex));
            this.$ajax.get('getcomments2.json')
            .then(res=>{
                console.log(res);
                this.comments = this.comments.concat(res.data.message);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        sendComent(){
            // 发表评论后台
            console.log(this.cid);
            // post axios会自动判断 类型 字符串 application/wwww-xxx 对象 application/json
            this.$ajax.post('postcomment.json','content='+this.msg)
            .then(res=>{
                console.log(res);
                this.loadFirst();
                this.msg = '';
            })
            .catch(err=>{
                console.log(err);
            })
            // 获取最新一页的数据

        },
        goBack(){
            this.$router.go(-1);
        }
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
