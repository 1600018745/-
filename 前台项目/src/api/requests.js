//对于axios进行二次封装
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
//1.利用axios对象的方法create,去创建一个axios实例
//2.request就是axios,只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    //代表请求超时的时间5s
    timeout:5000,
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    return config; 
    
});

// 响应拦截器

requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
}, (err) => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
});
//对外暴露
export default requests;