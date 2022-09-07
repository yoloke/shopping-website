<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">
          <input type="checkbox" name="chk_list" :checked="isCartChecked" />
          全部
        </div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="item in cartInfoList"
          :key="item.id"
          :class="item.isChecked == 1 ? 'item-seleted' : ' '"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="changeChecked(item, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="hander('mins', -1, item)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="hander('change', $event.target.value * 1, item)"
            />
            <a class="plus" @click="hander('add', 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(item.skuId)">删除</a>
            <br />
            <a >移到收藏</a>
          </li>
        </ul>

        <!-- <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods2.png">
            <div class="item-msg">华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">黑色版本</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">5622.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">5622</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods3.png">
            <div class="item-msg">iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">墨绿色</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">11399.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">11399</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCartChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下架商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "shopCart",
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("shopcart", ["cartInfo"]),
    //计算购物车的数据
    cartInfoList() {
      return this.cartInfo.cartInfoList || [];
    },
    //购物车商品总价
    totalPrice() {
      var sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum;
      });
      return sum;
    },
    //全选的状态
    isCartChecked() {
      //购物车里面的数据进行过滤(勾选)，如果勾选的商品与购物车商品总数相等。全选勾选！相反不够！！！
      return (
        this.cartInfoList.filter((item) => item.isChecked == "1").length ===
        this.cartInfoList.length
      );
    },
  },
  methods: {
    //获取个人数据
    getData() {
      this.$store.dispatch("shopcart/getShopCart");
    },
    //修改某一个商品的勾选的状态
    async changeChecked(item, e) {
      //整理参数
      let params = {
        skuId: item.skuId,
        isChecked: e.target.checked ? "1" : "0",
      };
      //发请求:修改商品的勾选的状态
      try {
        await this.$store.dispatch("shopcart/changeChecked", params);
        this.getData();
      } catch (error) {}
    },
    //修改产品个数 节流 一秒内只能点击一次
     hander:throttle(async function(type, disNum, item) {
      switch (type) {
        //加号
        case "add":
          disNum = 1;
          break;
        //减号
        case "mins":
          disNum = item.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - item.skuNum;
          }
          // disNum = (isNaN(disNum) || disNum < 1)?0:parseInt(disNum) - item.skuNum
          break;
      }
      try {
        //派发action
        await this.$store.dispatch("detail/addOrUpdateCart", {
          skuId: item.skuId,
          skuNum: disNum,
        });
        //再一次获取数据
        this.getData();
      } catch (error) {}
    },1000),
    //删除某个产品
    async deleteCartById(skuId) {
      try {
        //删除商品成功
        await this.$store.dispatch("shopcart/deleteCartById", skuId);
        //再次获取购物车最新的数据
        this.getData();
      } catch (error) {
        alert("删除失败");
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 10px 0;
    font-size: 16px;
    line-height: 21px;
    color: #e2231a;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 17%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 28%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5 {
        width: 14.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      border-bottom: none;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        overflow: hidden;
        display: flex;
        align-items: center;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 22%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 12.8333%;
          margin-right: 81px;
          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 16.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 17px;
            text-align: center;
            height: 33px;
            line-height: 33px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 17px;
            text-align: center;
            height: 33px;
            line-height: 33px;
          }
        }

        .cart-list-con6 {
          width: 15.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 5.5%;

          a {
            color: #666;
            &:hover{
              cursor: pointer;
              color:  #ff6700;
            }
          }
        }
      }
      .item-seleted {
        background: #fff4e8;
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>