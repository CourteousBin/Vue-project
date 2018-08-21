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


//引入自己的vue文件 开始  
import App from './app.vue';
import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Shopcar from './components/shopcar/shopcar.vue';
import Search from './components/search/search.vue';
import Newslist from './components/news/newslist.vue';
import NewsDetail from './components/news/newsdetail.vue';
import PhotoShare from './components/photo/photoshare.vue';

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
        {name:'photo.share',path:'/photo/share',component:PhotoShare}
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

//创建vue实例
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})