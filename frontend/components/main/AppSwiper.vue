<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(image, index) in images" :key="index" class="swiper-slide">
        <div class="swiper-zoom">
          <img class="swiper-lazy" :src="image" alt="">
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>

    <div v-if="viewportSize != 'xs'" class="swiper-button-prev"></div>
    <div v-if="viewportSize != 'xs'" class="swiper-button-next"></div>
  </div>
</template>
<script>
import breakpointsMixin from "~/mixins/breakpoints.mixin";
import Swiper from "swiper/bundle";

export default {
  mixins: [breakpointsMixin],
  props: {
    current: {
      type: Number,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  mounted() {
    let mySwiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      scrollbar: {
        el: ".swiper-scrollbar"
      }
    });
    mySwiper.slideTo(this.current, false,false)
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
@import 'swiper/swiper-bundle.css'
.swiper-container
  width: 100%
  height: 100%
  .swiper-button-next,
  .swiper-button-prev
    color $primary
.swiper-slide
  display flex
  justify-content center
  align-items center
.swiper-zoom
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  img
    max-width 100%
    max-height 100%
    object-fit contain
.swiper-pagination
  .swiper-pagination-bullet
    opacity 1
    border white solid 1px
    background-color $primary
  .swiper-pagination-bullet-active
      background-color $primary

</style>
