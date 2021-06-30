<template>
  <nuxtLink :to="`/product/${item._id}`" class="app-card">
    <div class="app-card__content">
      <div class="app-card__image-container">
        <el-image
          class="app-card__image"
          lazy
          :src="item.images[0].thumb"
        ></el-image>
        <div v-if="item.discount" class="app-card__discount">
          -{{ item.discount }}%
        </div>
      </div>
      <div class="app-card__price-block">
        <span class="app-card__price">{{
          item.discount ? item.discountPrice : item.price | currency
        }}</span>
        <span v-if="item.discount" class="app-card__former-price">{{
          item.price | currency
        }}</span>
      </div>
      <div class="app-card__description-block">
        <p>{{ item.name }}</p>
        <p>
          {{ item.description }}
        </p>
      </div>
    </div>
  </nuxtLink>
</template>
<script>
export default {
  name: "AppCard",
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {};
  },
  methods: {
    handleClick(e) {
      console.log("handle click");
      console.log(this.$route);
      this.$router.push(`/product/${this.item._id}`);
    }
  },
  computed: {
    price() {
      return Math.floor(
        this.item.price - (this.item.price * this.item.discount) / 100
      );
    }
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-card
  text-decoration none
  &__card-content
    width 100%
  &__image-container
    width 100%
    padding-bottom 133.33%
    position relative
  &__image
    position absolute
    top 0
    bottom 0
    left 0
    right 0
  &__discount
    position absolute
    bottom 8px
    left 8px
    z-index 1
    padding 8px
    border-radius 8px
    font-size 1rem
    font-weight 600
    color white
    background-color $danger
  &__price-block
    padding 8px 0
    display flex
    overflow hidden
    display flex
    flex-wrap wrap
  &__price
    font-size 18px
    font-weight 700
    color $primary
    margin-right 8px
  &__former-price
    color $secondary-text
    font-weight 500
    position relative
    padding 0 2px
    &::before
      content ''
      background-color $secondary-text
      height 2px
      width 100%
      position absolute
      left 0px
      top 11px
    &::after
      content ''
      background-color white
      height 1px
      width 100%
      position absolute
      left -2px
      top 13px
  &__description-block
    font-size 12px
    color $secondary-text
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow ellipsis
    p:first-of-type
      color $primary
</style>
