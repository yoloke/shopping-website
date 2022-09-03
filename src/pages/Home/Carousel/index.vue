<template>
  <div class="swiper-container" ref="cur" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carouse) in carouselList" :key="carouse.id">
        <img :src="carouse.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/css/swiper.css'
export default {
  name: "Carousel",
  props:["carouselList"],
  watch: {
    carouselList: {
      //这里监听，无论数据有没有变化，上来立即监听一次
      immediate: true,
      //监听后执行的函数
      handler(){
        //第一次ListContainer中的轮播图Swiper定义是采用watch+ this.$nextTick()实现

        this.$nextTick(() => {
          let mySwiper = new Swiper(this.$refs.cur,{
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>