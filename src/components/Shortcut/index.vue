
<template>
<!-- 头部 -->
  <section class="nav">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>掌上豹欢迎您！</p>
          <p>
            <span>请</span>
            <!-- 声明书导航一定要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的掌上豹</a>
          <a href="###">掌上豹会员</a>
          <a href="###">企业采购</a>
          <a href="###">商家服务</a>
          <a href="###">客服</a>
          <a href="###">网站导航</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.nav {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 20px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
}
</style>