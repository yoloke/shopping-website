<!--  -->
<template>
  <div>
    <Shortcut></Shortcut>
    <!-- header头部模块制作 start -->
    <header class="header">
      <!-- logo模块 -->
      <div class="logo">
        <h1>
          <a href="http://localhost:8000/#/home" title="掌上豹">掌上豹</a>
        </h1>
      </div>
      <div class="search_hotwords">
        <!-- search搜索模块 -->
        <div class="search">
          <input type="search" name="" id="" placeholder="搜索商品" v-model="keyword" />
          <button @click="gotoSearch">搜索</button>
        </div>
        <!-- hotwords模块制作 -->
        <div class="hotwords">
          <a href="#" class="style_red">优惠购首发</a>
          <a href="#">亿元优惠</a>
          <a href="#">9.9元团购</a>
          <a href="#">美满99减30</a>
          <a href="#">办公用品</a>
          <a href="#">电脑</a>
          <a href="#">通信</a>
        </div>
      </div>
      <!-- 购物车模块 -->
      <div class="shopcar" @click="gotoShopCart">
        <span class="el-icon-shopping-cart-full"></span>
        我的购物车 
        <span class="count">8</span>
        <span class="el-icon-arrow-right"></span>
      </div>
    </header>
  </div>
</template>

<script>
import ShopCart from '@/pages/ShopCart/index.vue';
import Shortcut from '../Shortcut/index.vue';
export default {
    data() {
        return {
            keyword: ""
        };
    },
    methods: {
        gotoSearch() {
            let locations = {
                name: "search",
                params: {
                    keyword: this.keyword
                },
            };
            //确定路径当中有query参数
            if (this.$route.query.categoryName) {
                locations.query = this.$route.query;
            }
            this.$router.push(locations);
        },
        //去购物车页面
        gotoShopCart() {
            this.$router.push("/shopCart");
        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() { },
    mounted() {
        //  组件挂载时就监听clear事件，clear事件在search模块中定义
        //  当删除关键字面包屑时，触发该事件，同时header的输入框绑定的keyword要删除
        this.$bus.$on("clearKeyword", () => {
            this.keyword = "";
        });
    },
    components: { ShopCart, Shortcut }
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 140px;
  width: 1200px;
  margin: 0 auto;
}
.logo {
  margin: auto 0;
}
.logo a {
  display: block;
  width: 133px;
  height: 131px;
  background-size: 100%;
  background: url(./images/logo.png) no-repeat;
  /* font-size: 0;京东的做法*/
  /* 淘宝的做法让文字隐藏 */
  text-indent: -9999px;
  overflow: hidden;
}
.search_hotwords {
  margin-top: 52.5px;
}
.search {
  display: flex;
  width: 538px;
  height: 36px;
  border: 2px solid #ff6700;
}
.search input {
  width: calc(100% - 58px);
  height: 32px;
  padding-left: 10px;
}
.search button {
  width: 58px;
  height: 33px;
  background-color: #ff6700;
  font-size: 16px;
  color: #fff;
}
.hotwords {
  background-color: #fff;
  margin-top: 6px;
}
.hotwords a {
  margin: 0 10px;
}
.shopcar {
  position: relative;
  margin: auto 0;
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
  width: 140px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border: 1px solid #dfdfdf;
  background-color: #f7f7f7;
  cursor: pointer;
}
.el-icon-shopping-cart-full {
  margin-left: 5px;
  line-height: 35px;
  font-size: 18px;
  font-weight: 700;
  color: #ff6700;
}
.el-icon-arrow-right {
  margin-right: 10px;
  font-weight: 700;
  line-height: 35px;
}
.count {
  position: absolute;
  top: -6px;
  left: 22px;
  height: 14px;
  line-height: 14px;
  color: #fff;
  background-color: #ff6700;
  padding: 0 5px;
  border-radius: 7px 7px 7px 0;
}
</style>