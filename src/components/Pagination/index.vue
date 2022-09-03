<!--  -->
<template>
  <!-- 分页器 -->
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <!-- 上一页 -->
        <li
          class="prev"
          :class="pageNo == 1 ? 'disabled' : ''"
          @click="$emit('getPageNo', pageNo - 1)"
        >
          <a>«上一页</a>
        </li>

        <li v-if="startAndEnd.start > 1" @click="$emit('getPageNo', 1)">
          <a>1</a>
        </li>
        <li class="dotted" v-if="startAndEnd.start > 2"><span>...</span></li>
        <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
        <li
          v-for="page in startAndEnd.end"
          :key="page"
          v-if="page >= startAndEnd.start"
          :class="{active:pageNo==page}"
          @click="$emit('getPageNo', page)"
        >
          <a>{{ page }}</a>
        </li>
        <li class="dotted" v-if="startAndEnd.end < totalPage - 1">
          <span>...</span>
        </li>
        <li v-if="startAndEnd.end < totalPage" @click="$emit('getPageNo', totalPage)">
          <a>{{ totalPage }}</a>
        </li>

        <!-- 下一页 -->
        <li class="next" @click="$emit('getPageNo',pageNo + 1)">
          <a href="#">下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{ total }}个商品&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //分页器起始与数据计算
  //pageNo当前页
  //pageSize一页多少数据
  //total一共有多少数据
  //continues代表分页连续页码个数  一般是5和7  奇数  对称
  props: ["pageNo", "pageSize", "total", "continues"],
  name: "Pagination",
  computed: {
    //计算一共多少页
    totalPage() {
      //shang
      return Math.ceil(this.total / this.pageSize);
    },
    //底下的代码是整个分页器最重要的地方[算出连续五个数字、开头、结尾]
    startAndEnd() {
      //算出连续页码:开始与结束这两个数字
      let start = 0,
        end = 0;
      const { totalPage, continues, pageNo } = this;
      //特殊情况:总共页数小于连续页码数
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        //正常情况：分页器总页数大于连续页码数
        //当前第8页  6 7 8 9 10 continues=5
        //当前第8页  5 6 7 8 9 10 11 continues=7
        //continues可能会变化   不能写死 start = pageNo-2
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //约束start|end在合理范围之内
        //约束头部
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //约束尾部
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
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
            border-color: #e1251b;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          pointer-events: none;
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