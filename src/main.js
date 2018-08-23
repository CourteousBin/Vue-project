'use strict';

import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Mint from 'mint-ui';

import 'mint-ui/lib/style.css';

Vue.use(Mint);

import './static/vendor/mui/dist/css/mui.css';

import './static/css/global.css';

import Axios from 'axios';

Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = '/api';
Axios.interceptors.request.use(function(config){
    // 常规操作
    // 显示loading
    Mint.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    })
    return config;
});
Axios.interceptors.response.use(function(config){
    // 获取到响应中的data,进行加工
    Mint.Indicator.close();
    return config;
});


// 主程序不能懒加载
import App from './app.vue';

// 懒加载
// 官方例子
// const Foo = resole => require(['./Foo.vue'],resolve);

const Home = r=> require(['./components/home/home.vue'],r);
const Member = r=> require(['./components/member/member.vue'],r);
const Shopcar = r=> require(['./components/shopcar/shopcar.vue'],r);
const Search = r=> require(['./components/search/search.vue'],r);
const Newslist = r=> require(['./components/news/newslist.vue'],r);
const NewsDetail = r=> require(['./components/news/newsdetail.vue'],r);
const PhotoShare = r=> require(['./components/photo/photoshare.vue'],r);
const PhotoDetail = r=> require(['./components/photo/photodetail.vue'],r);
const GoodsList = r=> require(['./components/goods/goodslist.vue'],r);
const GoodsDetail = r=> require(['./components/goods/goodsdetail.vue'],r);
const GoodsComment = r=> require(['./components/goods/goodscomment.vue'],r);

//引入自己的vue文件 开始  
// import App from './app.vue';
// import Home from './components/home/home.vue';
// import Member from './components/member/member.vue';
// import Shopcar from './components/shopcar/shopcar.vue';
// import Search from './components/search/search.vue';
// import Newslist from './components/news/newslist.vue';
// import NewsDetail from './components/news/newsdetail.vue';
// import PhotoShare from './components/photo/photoshare.vue';
// import PhotoDetail from './components/photo/photodetail.vue';
// import GoodsList from './components/goods/goodslist.vue';
// import GoodsDetail from './components/goods/goodsdetail.vue';
// import GoodsComment from './components/goods/goodscomment.vue';

let router = new VueRouter({
	linkActiveClass:'mui-active',
    routes: [
        //VueRouter：配置路由规则
        { path: '/', redirect: { name: 'home' } }, //重定向
        { name: 'home', path: '/home', component: Home }, //首页
        { name: 'member', path: '/member', component: Member }, //
        { name: 'shopcart', path: '/shopcart', component: Shopcar },
        { name: 'search', path: '/search', component: Search },
        {name:'news.list',path:'/news/list',component:Newslist},
        {name:'news.detail',path:'/news/detail',component:NewsDetail},
        {name:'photo.share',path:'/photo/share',component:PhotoShare},
        {name:'photo.detail',path:'/photo/detail/:id',component:PhotoDetail},
        {name:'goods.list',path:'/goods/list',component:GoodsList},
        {name:'goods.detail',path:'/goods/detail',component:GoodsDetail},
        {name:'goods.comment',path:'/goods/comment',component:GoodsComment},
        {name:'goods.pictureInfo',path:'/goods/pictureinfo',components:NewsDetail}
    ]
})

// 第三方
import Moment from 'moment';
// 定义全局过滤器
Vue.filter('converDate',function(value){
	return Moment(value).format('YYYY-MM-DD');
})

// 全局组件
import NavBar from './components/common/navBar.vue';
Vue.component('navBar',NavBar);

import Comment from './components/common/comment.vue';
Vue.component('comment',Comment);

import MySwipe from './components/common/mySwiper.vue';
Vue.component('mySwipe',MySwipe); // my-swipe

// 预览插件 vue-preview
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//创建vue实例
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})