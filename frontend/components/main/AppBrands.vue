<template>
  <div class="app-brands">
    <h3 class="app-brands__title">Бренды</h3>
    <div class="app-brands__banners">
      <ul class="app-brands__banners-list">
        <li
          v-for="item in brands"
          :key="item.name"
          class="app-brands__banners-item"
        >
          <div class="app-brands__image-wrapper">
            <nuxt-link class="app-brands__banner" to="/">
              <img fit="cover" :src="item.bannerUrl" :alt="item.name" />
            </nuxt-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Brands",
  data() {
    return {
      brands: []
    };
  },
  async fetch() {
    const { data: fetchedBanners } = await this.$axios.get(
      "http://localhost:5050/api/brands"
    );
    this.brands = fetchedBanners;
  }
};
</script>
<style lang="stylus">
.app-brands
  &__title
    margin-top 32px
    margin-bottom 24px
  &__banners
    width: 100%
    position relative
    padding-bottom 8px
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    -webkit-overflow-scrolling: touch;
    scrollbar-width none
    &::-webkit-scrollbar
      display: none;
  &__banners-list
    display flex
    list-style none
  &__banners-item
    flex-grow 1
    width 300px
    flex-shrink 0
    margin-right 16px
    &:last-child
      margin-right 0
  &__image-wrapper
    position relative
    width 100%
    padding-bottom 56.25%
  &__banner
    display block
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    img
      width 100%
      height 100%
      object-fit cover
</style>
