<!--  -->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2">
          <!-- 一级分类 -->
          <ul>
            <li
              class="item"
              v-for="c1 in categoryList.slice(0, 14)"
              :key="c1.categoryId"
            >
              <h3>
                <a>{{ c1.categoryName }}</a>
              </h3>
              <!-- 二级分类 -->
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a href="">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <!-- 三级分离 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    //通知vuex发请求，获取数据，存储在仓库种
    this.$store.dispatch("home/categoryList");
    console.log(this.categoryList);
  },
  computed: {
    // ...mapState("home",["categoryList"])
    //右侧需要一个函数，但使用这个计算属性的时候，右侧函数会立即执行一次
    //注入一个参数state,是大仓库的数据
    // ...mapState({
    //   categoryList: (state) => {
    //     console.log(state.home.categoryList);
    //   }
    // })
    //简化
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>
<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #ff6700;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      box-sizing: border-box;
      width: 210px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #ff6700;
      border: 2px solid #ff6700;
      border-bottom: none;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      display: flex;
      align-items: center;
      left: 0;
      top: 45px;
      margin-top: 2px;
      width: 210px;
      height: 454px;
      position: absolute;
      background: rgba(234, 234, 234);
      // box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
      z-index: 999;

      .all-sort-list2 {
        width: 100%;
        .item {
          h3 {
            line-height: 30px;
            font-size: 15px;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              font-weight: 700;
              color: #333;
              font-size: 13px;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 736px;
            min-height: 454px;
            background-color: #fff;
          
            box-shadow: 2px 2px 2px rgba(0,0,0,.3);
            border: 1px solid #e0e0e0;
            left: 210px;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                // border-top: 1px solid #eee;
                padding: 10px 0;
                overflow: hidden;
                zoom: 1;
                // &.fore {
                //   border-top: 5px;
                // }
                dt {
                  float: left;
                  text-align: right;
                  width: 80px;
                  font-weight: 700;
                  &::after {
                    content: ">";
                    font-weight: 700;
                    margin-left: 5px;
                  }
                }

                dd {
                  float: left;
                  width: 415px;

                  em {
                    float: left;
                    padding: 0 8px 6px 8px;
                    
                  }
                }
              }
              a:hover {
                      color: #ff6700;
                    }
            }
          }

          &:hover {
            background-color: #ff6700;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>