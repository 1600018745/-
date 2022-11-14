
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
//引入路由组件
import routes from "./routes";
import store from "@/store";
// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来push方法，跳转路径及信息（参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call||apply的区别
// 相同点，都可以调用函数一次，都可以篡改函数上下文一次
// 不同点：call与apply传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }

}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }

}



//配置路由
const router = new VueRouter({
  //配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});
export default router;
// router.beforeEach(async (to,from,next)=>{
//     let token = store.state.user.token;
//     let name = store.state.user.userInfo.name;
//     // to:可以获取到你要跳转到那个路由信息
//     // from：可以获取到你从那个路由而来的信息
//     next();
//     // next：放行函数 next()放行 next(path)放行到指定路由  next(false);
//     if (token) {
//         //用户登录了,不能去login
//         if (to.path == "/login"||to.path=='/register') {
//             next('/home');
//         } else {
//             //用户登陆了,而且还有用户信息【去的并非是login】
//             if (name) {
//                 next();
//             } else
//              {
//                 //用户登陆了,但是没有用户信息 
//                 try {
//                     //发请求获取用户信息以后在放行
//                     await store.dispatch('getUserInfo');
//                     next();
//                 } catch (error) {
//                     //用户没有信息，还携带token发请求获取用户信息【失败】
//                     //token【学生证失效了】
//                     //token失效:本地清空数据、服务器的token通知服务器清除
//                     await store.dispatch('userLogout');
//                     //回到登录页，重新获取一个新的学生证
//                     next('/login');
//                 }
//             }
//         }
//     }else{
//         let toPath = to.path;

//         if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay') !=-1|| toPath.indexOf('/center'!=-1)){
//             next('/login?redirect='+toPath);
//         }else{
//             next();
//         }
//     }
// });

router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录
    if (token) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (name) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('userLogout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect='+toPath);
        } else {
            next();
        }
    }
});
