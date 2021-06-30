<template>
  <div class="app-banner">
    <div class="app-banner__carousel-wrapper">
      <el-carousel class="app-banner__carousel" trigger="click" height="100%">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img
            v-if="viewportSize === 'xs'"
            :src="item.urlMobile"
            :alt="item.name"
          />
          <img v-else :src="item.urlDesktop" :alt="item.name" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import breakpointsMixin from "~/mixins/breakpoints.mixin";
export default {
  name: "AppBanner",
  mixins: [breakpointsMixin],
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-banner
  width 100%
  padding-bottom 75%
  position relative
  +sm()
    padding-bottom 0
    height 400px
  &__carousel-wrapper
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    +sm()
      position static
      width 100%
      height 100%
      top auto
      bottom auto
      left auto
      right auto
  &__carousel
    height 100%
    img
      width 100%
      box-sizing border-box
      padding 0
      height 100%
      object-fit cover
    .el-carousel__button
      background-color $primary!important
      width 12px
      height 12px
      border 1px solid white
      border-radius 8px
      opacity 0.3
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
