<template>
  <div>
    <!-- 三级联动组件:已经注册为全局组件,不需要再引用 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRcommend></TodayRcommend>
    <Rank></Rank>
    <Like></Like>
    <Floor  v-for="(floor,index) in floorList" :key="index" :list="floor" ></Floor>
    
    <Brand></Brand>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from '@/pages/Home/ListContainer';
import Brand from '@/pages/Home/Brand';
import Floor from '@/pages/Home/Floor';
import Like from '@/pages/Home/Like';
import Rank from '@/pages/Home/Rank';
import Recommend from '@/pages/Home/Recommend';
import TodayRcommend from '@/pages/Home/TodayRcommend';

import { mapState } from 'vuex';
export default {
    name: "Home",
    data() {
        return {};
    },
    components: {
      ListContainer,
      Floor,
      Brand,
      Like,
      Rank,
      Recommend,
      TodayRcommend
    },
    mounted() {
    this.$store.dispatch("floorList");
    // 获取用户信息在首页展示
    this.$store.dispatch('getUserInfo');
  },
    computed:{
      ...mapState({
        floorList:(state)=>state.home.floorList,
      })
    }
}
</script>

<style>

</style>