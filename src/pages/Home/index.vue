<!--  -->
<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav />
    <!-- 轮播图组件 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐组件 -->
    <Recommend></Recommend>
    <!-- 商品排行组件 -->
    <Rank></Rank>
    <!-- 猜你喜欢组件 -->
    <Like></Like>
    <!--楼层组件-->
    <Floor v-for="item in floorLists" :key="item.id" :floor="item"></Floor>
    <!-- 商标组件 -->
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ListContainer from "./ListContainer/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  //组件挂载完毕钩子
  mounted() {
      this.$store.dispatch("home/getFloorList");
    },
  computed: {
    // ...mapState({
    //   floorList: (state) => state.home.floorList,
    // }),
     ...mapState("home",["floorLists"])
  },
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>