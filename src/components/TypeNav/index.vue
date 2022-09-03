<!--  -->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex()" @mouseenter="entershow">
        <!-- 商品详情导航展示 -->
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
           <div class="sort" v-show="show">
          <!-- 事件委派+编程时导航 实现路由跳转 -->
          <div class="all-sort-list2" @click="goSearch">
            <ul>
              <!-- li循环列表 -->
              <li
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 14)"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ active: currentIndex == index }"
                >
                  <!-- 一级分类标题 -->
                  <a
                    class="c1"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 三级分离 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        </transition>
      </div>
      <!-- 导航栏 -->
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//全部引入，引入lodash全部函数功能
//import _ from "lodash"; 函数节流和防抖
//按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 0),
    //鼠标移出事件
    leaveIndex() {
      this.currentIndex = -1;
      //如果不是在home组件 就实现鼠标移入移出的动画效果
      if (this.$route.name != 'home') {
        this.show=false
      }
    },
    //点击_路由跳转
    goSearch(event) {
      let element = event.target
      //html中会把大写转为小写
      //获取目前鼠标点击标签的categoryname,category1id,category2id,category3id，
      // 通过四个属性是否存在来判断是否为a标签，以及属于哪一个等级的a标签
      let {categoryname,category1id,category2id,category3id} = element.dataset
      //categoryname存在，表示为a标签
      if(categoryname){
        //category1id一级a标签
        //整理路由跳转的参数
        let location = {name:'search'}//跳转路由name
        let query = {categoryName:categoryname}//路由参数

        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
        //category2id二级a标签
          query.category2Id = category2id
        }else if(category3id){
        //category3id三级a标签
          query.category3Id = category3id
        }
        //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
        if (this.$route.params.keyword) {
          location.params = this.$route.params;
        }
        //整理完参数
        location.query = query
        //路由跳转
        this.$router.push(location)
        this.show = false
      }
    },
    //鼠标移入显示组件
    entershow() {
      this.show=true
    }
  },
  mounted() {
    if (this.$route.name != 'home') {
        this.show=false
      }
  }
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
      color: #fff;
      background-color: #ff6700;
      border: 2px solid #ff6700;
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
      left: 0;
      top: 45px;
      margin-top: 2px;
      width: 210px;
      height: 465px;
      position: absolute;
      background: #ff6700;
      z-index: 999;

      .all-sort-list2 {
        width: 100%;
        .item {
          h3 {
            .c1 {
              display: block;
              height: 32px;
              line-height: 32px;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;
              font-weight: normal;
              color: #fff;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 735px;
            min-height: 459px;
            background-color: #fff;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
            // border: 1px solid #e0e0e0;
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
          .active {
            background-color: #fff;
            cursor: pointer;
            a {
              color: #ff6700;
            }
          }
          // &:hover {
          //   // background-color: #fff;
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }

    }
    /*过渡动画:商品分类*/
    //  进入的起点
    .sort-enter {
      height: 0px;
    }
    //  进入的过程
    .sort-enter-active {
      transition: all 0.3s;
    }
    //  进入的终点
    .sort-enter-to {
      height: 461px;
    }

  }
}
</style>