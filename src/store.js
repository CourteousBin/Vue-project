import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	count : 44
}

const mutations	= {
	jia(state,n){
		// 多个值
		state.count += n.a;
	},
	jian(state){
		state.count --;
	}
}

// 
const getters = {
	// ES6 箭头的函数值的是上一层
	// ES5 箭头函数 指的是现在调用
	count:function(state){
		return state.count += 100;
	}
}

const actions = {
	// context 代表整个state
	jiaplus(context){
		context.commit('jia',{a:1})
	},
	jianplus({commit}){
		commit('jian')
	}
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})