<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--商品的名字的面包屑的地方  -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeBread">×</i>
            </li>
            <!-- 关键字面包屑的地方 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 商品属性值面包屑的地方 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--选择器-->
        <SearchSelector
          @getTradeMark="getTradeMark"
          @getAttrAndAttrValue="getAttrAndAttrValue"
        />
        <!--details-->
        <div class="details clearfix">
          <!-- 综合、价格排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 这里isOne、isTwo、isAsc、isDesc是计算属性，如果不使用计算属性要在页面中写很长的代码-->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <!--阿里图标前置类iconfont-->
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"
                      ><img
                        :src="
                          item.defaultImg
                            ? item.defaultImg
                            : 'http://47.93.148.192:8080/group1/M00/02/DA/rBHu8mGxO7mAIZosAACYibCV0ks310.jpg'
                        "
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link to="/detail">
                      <span v-html="item.title"></span>
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人收藏</i>
                  </div>
                  <div class="operate">
                    <router-link
                      :to="`/detail/${item.id}`"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</router-link
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- continues代表分页连续页码个数  一般是5和7  奇数  对称 -->
          <Pagination
            :total="total"
            :pageSize="searchParams.pageSize"
            :pageNo="searchParams.pageNo"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      //带给服务器的数据
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 8, //代表当前一页显示几条数据 【默认初始值:10】
      },
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    //删除分类(query)面包屑
    removeBread() {
      this.searchParams.categoryName = undefined;
      this.$router.push({ name: "search", params: this.$route.params });
    },
    //删除搜索关键字(params)面包屑
    removeKeyword() {
      this.searchParams.keyword = undefined;
      //通知兄弟组件header删除输入框的keyword关键字
      this.$bus.$emit("clearKeyword");
      this.$router.push({ name: "search", query: this.$route.query });
    },
    //获取子组件传递的品牌信息（自定义事件）
    getTradeMark(tradeMark) {
      //接口文档中trademark的信息是"ID:品牌名称"形式
      this.searchParams.trademark = `${tradeMark.tmId}:${tradeMark.tmName}`;
      this.getData();
    },
    //删除品牌面包屑
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //获取子组件传递的属性信息（自定义事件）
    getAttrAndAttrValue(attr, attrValue) {
      //searchParams.props元素为字符串形式，api文档有介绍
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
        this.getData(this.searchParams.props);
      }
    },
    //删除属性面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
    },
    //flag用于区分综合、价格，1：综合，2：价格
    changeOrder(flag) {
      let newSearchOrder = this.searchParams.order;
      //将order拆为两个字段orderFlag(1:2)、order(asc:desc)
      let orderFlag = this.searchParams.order.split(":")[0];
      let order = this.searchParams.order.split(":")[1];

      //由综合到价格、由价格到综合
      if (orderFlag !== flag) {
        //点击的不是同一个按钮
        newSearchOrder = `${flag}:desc`;
        this.getData();
      } else {
        //多次点击的是同一个按钮
        newSearchOrder = `${flag}:${order === "desc" ? "asc" : "desc"}`;
      }
      //需要给order重新赋值
      this.searchParams.order = newSearchOrder;
      console.log(this.searchParams);
      //再次发请求
      this.getData();
    },
    //获取getPageNo
    getPageNo(PageNo) {
      //console.log(PageNo);
      //父组件整理参数
      this.searchParams.pageNo = PageNo;
      this.getData();
    },
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    //商品分类搜索条件
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyWord;
    // console.log(this.$route.params.keyWord);
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("search", ["goodsList", "total"]),
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
  },
  //通过watch监听路由的变化---[商品的名字路由里面的吗]
  watch: {
    //监听组件VC的$route属性
    //$route:{},应该用深度监听呀?
    //$route，是vue-router提供的
    $route() {
      //再次整理最新的商品名字参数
      // this.searchParams.category1Id = this.$route.query.category1Id;
      // this.searchParams.category2Id = this.$route.query.category2Id;
      // this.searchParams.category3Id = this.$route.query.category3Id;
      // this.searchParams.categoryName = this.$route.query.categoryName;

      //先把用户前面存储的1|2|3级别ID清除
      //发ajax的时候,属性值为undefind,甚至参数K都不携带了【10个搜索条件,可有可无的】
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //路由变化整理参数：手机最新的商品名字、商品1|2|3ID
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 9px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              &:hover {
                box-shadow: 0 0 2px 2px #f8f8f8;
                cursor: pointer;
              }
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>