//当前这个模块：API进行统一管理
import requests from "./requests";
import mockAjax from "./ajaxMock";

// 获取广告轮播列表
export const reqBanner = () => mockAjax.get("/banner");

// 获取首页楼层列表
export const reqFloor = () => mockAjax.get("/floor");

//三级联动接口
///api/product/getBaseCatgoryList   get 无参数

export const reqCategoryList = () => {
  //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
  //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
  //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
  return requests({ method: "get", url: "/product/getBaseCategoryList" });
};

export const reqPostSearchInfo = (params) =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });
// 获取商品详情信息

export const reqGoodInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: "get",
  });
// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
// 获取购物车列表的接口
export const reqCartList = () =>
  requests({ url: "cart/cartList", method: "get" });
// 删除购物车产品的接口
export const reqDeletecartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method:'get'
  });
// 注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:"post"});
// 登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:"post"});
// 带着token获取用户信息
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'});

// 获取用户地址信息
export const reqAddressInfo = () =>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});
export const reqOrderInfo = () =>requests({url:'/order/auth/trade',method:'get'});

// 提交订单接口
export const reqSubmitOrder = (tradeNo,data) =>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取支付信息
export const reqPayInfo= (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});


export const reqPayStatus= (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取订单列表
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});