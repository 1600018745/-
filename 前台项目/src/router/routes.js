import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';
export default [
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    //二级路由配置的地方
    children:[
         //我的订单
         {
              path:'myorder',
              component:MyOrder
         }
         ,
         {
             path:'grouporder',
             component:GroupOrder
         }
         ,
         {
             path:'/center',
             redirect:'/center/myorder'
         }
    ]
  },

  {
    path: "/paySuccess",
    name:"paySuccess",
    component: PaySuccess,
    meta: { show: true },
  },
  {
    path: "/pay",
    name:"pay",
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if(from.path=="/trade"){
        next();
      }else{
        next(false);
      }
    }
  },
  {
    path: "/trade",
    name:"trade",
    component: Trade,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if(from.path=="/shopcart"){
        next();

      }else{
        next(false);
      }
    }
  },
  {
    path: "/shopcart",
    name:"shopcart",
    component: ShopCart,
    meta: { show: true },
  },

  {
    path: "/addcartsuccess",
    name:"addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    meta: { show: true },
  },
  {
    path: "/home",
    component: Home,
    meta: { show: true },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },

  {
    path: "*",
    redirect: "/home",
  },
];
