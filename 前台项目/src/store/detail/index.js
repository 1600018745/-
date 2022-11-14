import { reqGoodInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token';
const state ={
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const actions ={
    async getGoodInfo({commit},skuId){
        let result = await reqGoodInfo(skuId);
        if(result.code==200){
            commit("GETGOODINFO",result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车以后发请求，前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，返回code=200，代表这次操作成功
        // 因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
}
const mutations ={
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
}
const getters ={
    //路径导航简化的数据
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    },
}
export default{
    state,
    mutations,
    actions,
    getters,
}
