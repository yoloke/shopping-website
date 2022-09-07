<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="succ-icon"></i> <span>商品已成功加入购物车！</span></h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="info.skuDefaultImg"/>
          </div>
          <div class="right-info">
            <p class="title">
              {{info.skuName}}
            </p>
            <span class="sale" v-for="item in saleList" :key="item.id">{{item.saleAttrName}} :
              <span v-for="item2 in item.spuSaleAttrValueList" :key="item2.id" v-if="item2.isChecked == 1">{{item2.saleAttrValueName}} </span>
            </span>
            <span class="attr">数量：{{$route.query.skuNum}}</span>
          </div>
        </div>
        <div class="right-gocart">
          <router-link :to="`/detail/${info.id}`" class="btn-tobback">查看商品详情</router-link>
          <router-link to="/shopcart" class="btn-addtocart">去购物车结算 > </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
export default {
  name: "AddCartSuccess",
  data() {
    return {
      //购物车成功组件，获取会话存储的数据【商品信息】
      info: JSON.parse(sessionStorage.getItem('SKUINFO')) || {},
      saleList: JSON.parse(sessionStorage.getItem('SPUSALEATTRLIST')) || {}
    }
  },
  computed: {
    ...mapGetters("detail", [ "skuInfo"]),
  },
};
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  background-color: #f4f4f4;

  .cart-complete {
    width: 1200px;
    margin: 0 auto;
    h3 {
      position: relative;
      font-size: 18px;
      line-height: 26px;
      font-weight: 400;
      color: #6aaf04;
      padding-top: 15px;
      padding-bottom: 15px;
      margin: 0;
      .succ-icon {
        position: absolute;
        display: inline-block;
        width: 25px;
        line-height: 26px;
        height: 25px;
        overflow: hidden;
        background: url(https://misc.360buyimg.com/user/cart/widget/addtocart-201608/i/addtocart-icons.png)
          0 0 no-repeat;
      }
      span {
        display: inline-block;
        margin-left: 36px;
      }
    }

    .goods {
      overflow: hidden;
      padding: 10px 0;
      .left-good {
        float: left;
        .left-pic {
          border: 1px solid #dfdfdf;
          width: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }
        .right-info {
          color: #444;
          float: left;
          margin-left: 10px;
          .title {
            width: 100%;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
          }
          .sale{
            color: #aaa;
            margin-right: 5px;
          }
          .attr {
            color: #aaa;
          }
        }
      }
      .right-gocart {
        padding: 10px 0;
        float: right;
        .btn-tobback {
          background: #fff;
          color: #e2231a;
          border: 1px solid #fff;
          margin-right: 10px;
        }
        .btn-addtocart {
          background: #e2231a;
          border: 1px solid #e2231a;
          color: #fff;
          &:hover {
            background: #c91623;
          }
        }
        a {
          padding: 7px 30px;
          font-size: 16px;
          line-height: 22px;
          color: #333;
          text-decoration: none;
          box-sizing: border-box;
          border: 1px solid #e1e1e1;
        }
        a:hover {
          background-color: #f7f7f7;
          border: 1px solid #eaeaea;
        }
        a:active {
          background-color: #e1e1e1;
          border: 1px solid #d5d5d5;
        }
        .btn-danger {
          background-color: #e1251b;
          color: #fff;
        }
        .btn-danger:hover {
          background-color: #e1251b;
        }
      }
    }
  }
}
</style>