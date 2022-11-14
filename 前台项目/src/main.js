import Vue from 'vue';
import App from './App.vue';
//三级联动组件----全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import { MessageBox } from 'element-ui';
//第一个参数:全局组件的名字 第二个参数：指明哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false;
//引入路由
import router from '@/router'
//引入vuex
import store from '@/store'
import '@/mock/mockServer'
import "swiper/css/swiper.css"
// 统一接口api文件夹里面全部请求函数
import * as API from '@/api';

// 引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),

  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
    
  },

  //注册路由:底下的写法Kv模式一致省略V【router小写的】
  //注册路由信息：当着里书写router的时候，组件身上都拥有$rout，$router属性
  router,
  //注册vuex
  store,

}).$mount('#app')
