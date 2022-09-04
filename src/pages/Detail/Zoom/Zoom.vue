<template>
  <div class="preview_img" >
    <!-- 正常的图片 -->
    <img :src="skuImageList[0].imgUrl" />
    <!-- 遮挡层 -->
    <div class="mask"></div>
    <!-- <div class="event"></div> -->
    <!-- 放大的图片 -->
    <div class="big">
      <img :src="skuImageList[0].imgUrl" />
    </div>
  </div>
</template>

<script>
  export default {
  name: "Zoom",
  props: {
    skuImageList: {
      default() {
          return [{}]
        }
      }
  },
    methods: {
     
    },
  }
</script>

<style lang="less">
  .preview_img {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

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
      cursor: pointer;
      background-color: pink;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
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
      z-index: 998;//提高层级
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