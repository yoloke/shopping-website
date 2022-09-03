<!--  -->
<template>
  <!-- 分页器 -->
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev disabled">
          <a href="#">«上一页</a>
        </li>
        <li class="active">
          <a href="#">1</a>
        </li>
        <li>
          <a href="#">2</a>
        </li>
        <li>
          <a href="#">3</a>
        </li>
        <li>
          <a href="#">4</a>
        </li>
        <li>
          <a href="#">5</a>
        </li>
        <li class="dotted"><span>...</span></li>
        <li class="next">
          <a href="#">下一页»</a>
        </li>
      </ul>
      <div><span>共10页&nbsp;</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang="less">
.page {
   
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 18px;

  .sui-pagination {
    display: flex;
    justify-content: center;
   

    ul {
     
      display: flex;
      vertical-align: middle;
      li {
        height: 18px;
        a {
          position: relative;
          float: left;
          line-height: 18px;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          font-size: 14px;
          padding: 11px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            line-height: 42px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 0 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      margin-left: 10px;
      color: #333;
      font-size: 14px;
      height: 42px;
      line-height: 42px;
    }
  }
}
</style>