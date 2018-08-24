<template>
    <div>
        <!-- 最直接的拿 vuex 值 -->
        {{ $store.state.count }} -- {{count}}
        
        <!-- 调用vuex方法用到 commit 才能出发 mutations 方法 -->
                                        <!-- 传值去 mutations 方法 , 如果单个值 这样 -->
        <!-- <mt-button type="primary" @click="$store.commit('jia',10)">+</mt-button> -->
                                        <!-- 多个值, 直接传对象过去 -->
        <mt-button type="primary" @click="$store.commit('jia',{a:10})">+</mt-button>
        <mt-button type="danger" @click="jian">-</mt-button>

        <mt-button type="primary" @click="jiaplus">+plus</mt-button>
        <mt-button type="danger" @click="jianplus">-plus</mt-button>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex';

    export default {

        data(){
            return {
                // count:0
            }
        },
// 拿到vuex count 
// 方式一
        // computed:{
        //     count(){
        //         return this.$store.state.count+1
        //     }
        // }
// 方式二
        // computed:mapState({
        //     // es6
        //     count:state => state.count

        //     // es5
        //     // count:function(state){
        //     //  return state.count
        //     // }
        // })

// 方式三
        // computed:mapState([
        //     "count"
        // ]),

        // 简化触发方法
        methods:{
            ...mapMutations([
                'jian'
            ]),
            ...mapActions([
                'jiaplus',
                'jianplus'
            ])
    },
        computed:{
            ...mapState([
                "count"
            ]),
            // 获得计算后的结果 getters 一:
            // count(){
            //     return this.$store.getters.count;
            // }
            // getters 方式二
            ...mapGetters([
                "count"
            ])
        },

        
    }
</script>
<style scoped>

</style>