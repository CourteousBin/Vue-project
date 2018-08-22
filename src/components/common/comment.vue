<template>
    <div>
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
                comments:[],
                pageIndex:1,// 页码
                msg:'',
            }
        },
        created(){
            // 评论操作开始
            this.loadFirst();
        },
        props:['cid'],
        methods:{
            loadFirst(){
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
                this.$ajax.post('postcomment.json','content='+this.msg)
                .then(res=>{
                    console.log(res);
                    this.loadFirst();
                    this.msg = '';
                })
                .catch(err=>{
                    console.log(err);
                })
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