import {reqGetCode,reqLogout,reqUserInfo,reqUserLogin,reqUserRegister} from "@/api";
import { getToken, removeToken, setToken } from "@/utils/token";
const state={
    code:'',
    token:getToken(),
    userInfo:{},
};
const mutations={
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
      state.token = token;
    },
    GETUSERINFO(state,userInfo){
      state.userInfo = userInfo;
    },
    CLEAR(state){
      state.token = '';
      state.userInfo={};
      removeToken();
    }
};
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的这个接口：把验证码返回
      let result = await reqGetCode(phone);
      if(result.code==200){
        commit("GETCODE",result.data);
      }else{
        return Promise.reject(new Error('faile'));
      }
    },
    async userRegister({commit},user){
       let result = await reqUserRegister(user);
       if(result.code==200){
            return 'ok';
       }else{
         return  Promise.reject(new Error('faile'));
       }

    },
    // 登陆业务（token）
    async userLogin({commit},data){
       let result = await reqUserLogin(data);
      //  服务器下发token，用户唯一标识
       if(result.code==200){
        commit("USERLOGIN",result.data.token);
        setToken(result.data.token);
        return "ok";
       }else{
         return Promise.reject(new Error('faile'));
       }
    },
    // 用户信息获取
    async getUserInfo({commit}){
      let result=  await reqUserInfo();
      if(result.code==200){
        commit("GETUSERINFO",result.data);
        return "ok";
       }else{
        
         return Promise.reject(new Error('faile'));
       }
    },
    // 退出登录
    async userLogout({commit}){
      let result = await reqLogout();
      if(result.code==200){
        commit("CLEAR");
        return 'ok';
      }else{
        return Promise.reject(new Error('faile'));
      }
    }
};
const getters={};

export default{
    state,
    mutations,
    actions,
    getters,
}