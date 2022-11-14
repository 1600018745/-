import { reqPostSearchInfo } from "@/api";
//search模块仓库
const state = {
    searchList:{}
};

const actions = {
    async postSearchList({commit},params={}){
      let result =  await reqPostSearchInfo(params);
      if(result.code==200){
        commit("POSTSEARCHLIST",result.data);

      }

    }
};
const mutations = {
    POSTSEARCHLIST(state,searchList){
        state.searchList = searchList; 
    }

};

const getters = {
    goodsList(state){
        return state.searchList.goodsList ||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList ||[];
    },
    attrsList(state){
        return state.searchList.attrsList ||[];
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}