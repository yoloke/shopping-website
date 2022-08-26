<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
//引入
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default {
  name: 'App',
  //注册
  components: {
    Header,
    Footer,
    Footer
  },
 mounted() {
    //通知vuex发请求，获取数据，存储在仓库种
    this.$store.dispatch("home/categoryList");
  },
}
</script>

<style lang="less">
</style>
