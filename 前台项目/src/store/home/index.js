import {reqCategoryList,reqBanner,reqFloor} from "@/api";

//home模块仓库

let state = {
    //state中数据默认初始值为空数组
    categoryList:[],
    bannerList:[],
    floorList:[]
};
let mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList;
    },

};

let actions = {
   //商品分类的actions
    //actions地盘:可不可以书写异步语句
    async categoryList({commit}) {
        //获取服务器的数据,存储在vuex仓库中
        //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        //await 等待成功的结果
        let result = await reqCategoryList();
        //判断服务器返回的状态是200->成功
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("CATEGORYLIST", result.data);
        }

    },
    async bannerList({commit}) {
        //获取服务器的数据,存储在vuex仓库中
        //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        //await 等待成功的结果
        let result = await reqBanner();
        //判断服务器返回的状态是200->成功
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("BANNERLIST", result.data);
        }
        
    },
    async floorList({commit}) {
        //获取服务器的数据,存储在vuex仓库中
        //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        //await 等待成功的结果
        let result = await reqFloor();
        //判断服务器返回的状态是200->成功
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("FLOORLIST", result.data);
        }
        
    },
};




let getters = {};

export default {
    state,
    getters,
    actions,
    mutations
}