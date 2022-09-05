<template>
  <div class="preview_img">
    <!-- 正常的图片 -->
    <img :src="imgObj.imgUrl" />
    <!-- 绑定鼠标移动事件 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 放大的图片 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮挡层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Zoom",
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    ...mapGetters("detail", ["skuInfo"]),
    //比如:服务器的数据没有回来,skuInfo空对象,如果空对象.skuImageList->undefined
    skuImageList() {
      return this.skuInfo.skuImageList || [];
    },
    imgObj() {
      return this.skuImageList[this.index] || {};
    },
  },
  methods: {
    handler(e) {
      //获取模板
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      //计算鼠标在图片内的left|top数值
      //offsetX：鼠标点击位置相对于触发事件对象的水平距离
      //left代表mask相对于图片的水平距离
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      //约束模板的上下左右范围
      if (left < 0) left = 0;
      if (left > mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top > mask.offsetHeight) top = mask.offsetHeight;
      //修改mask
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
  mounted() {
    //接受兄弟组件传递过来的索引值
    this.$bus.$on("sendIndex", (index) => {
      this.index = index;
    });
  },
};
</script>

<style lang="less">
.preview_img {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  cursor: move;

  img {
    width: 100%;
    height: 100%;
  }

 .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    display: none;
  }

  .big {
    width: 400px;
    height:400px;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998; //提高层级
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  &:hover .mask,
  &:hover .big {
    display: block;
  }
}
</style>