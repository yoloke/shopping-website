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
}
}
</script>

<style lang="less">
</style>
