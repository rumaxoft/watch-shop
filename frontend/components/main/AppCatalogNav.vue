<template>
  <div v-loading="loading" class="app-catalog-navigation">
    <button
      @click="showNav = true"
      class="app-catalog-navigation__menu-button"
      type="text"
    >
      <i class="el-icon-we-menu"></i>
      <span>Каталог</span>
    </button>
    <div
      class="app-catalog-navigation__nav"
      v-bind:class="{ 'app-catalog-navigation__nav--active': showNav }"
    >
      <div class="app-catalog-navigation__header">
        <button
          v-if="categoriesHistory.length > 0"
          class="app-catalog-navigation__back-button"
          @click="back"
          type="text"
        >
          <i class="el-icon-we-chevron-left"></i>
        </button>
        <h3>
          {{
            visibleCategory.name == "root" ? "Каталог" : visibleCategory.name
          }}
        </h3>
        <button
          @click="showNav = false"
          class="app-catalog-navigation__close-button"
          type="text"
        >
          <i class="el-icon-we-x"></i>
        </button>
      </div>
      <div class="app-catalog-navigation__catalog-container"></div>
      <ul class="app-catalog-navigation__catalog">
        <li
          v-for="item in visibleCategory.children"
          :key="item.name"
          class="app-catalog-navigation__catalog-item"
        >
          <a
            @click="next(item, $event)"
            href="#"
            class="app-catalog-navigation__catalog-link"
          >
            <span
              v-if="item.image"
              :style="{ 'background-image': `url(${item.image})` }"
              class="app-catalog-navigation__catalog-link-icon"
            ></span>
            <span class="app-catalog-navigation__catalog-link-text">
              {{ item.name }}
            </span>
            <i v-if="item.children" class="el-icon-we-chevron-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppCatalogNav",
  data: () => ({
    visibleCategory: null,
    categoriesHistory: [],
    showNav: false
  }),
  methods: {
    ...mapActions("catalog", ["fetchCatalog"]),
    next(item, e) {
      e.preventDefault();

      if (item.children?.length > 0) {
        this.categoriesHistory.push(this.visibleCategory);
        this.visibleCategory = item;
      } else {
        this.$router.push({ path: `/catalog${item.slugPath}` });
        this.showNav = false;
      }
    },
    back() {
      this.visibleCategory = this.categoriesHistory.pop();
    }
  },
  async fetch() {
    if (!this.catalog) {
      await this.fetchCatalog();
    }
  },
  created() {
    console.log(this.catalog);
    this.visibleCategory = this.catalog;
  },
  computed: {
    ...mapGetters("catalog", ["catalog", "loading", "errror"])
  }
};
</script>

<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'

.app-catalog-navigation
  margin-left 16px
  &__menu-button
    display flex
    align-items center
    border none
    background-color transparent
    height 40px
    border-radius 5px
    +sm()
      padding 8px 16px
      background-color $primary
    i
      color $primary
      font-size 24px
      +sm()
        color white
    span
      display none
      +sm()
        display block
        text-transform uppercase
        font-family roboto
        font-size 14px
        font-weight 700
        margin-left 4px
        color white
  &__nav
    padding 12px 16px 24px
    position fixed
    display flex
    flex-direction column
    background-color white
    top 0
    left 0
    right 0
    bottom 0
    transition transform 0.3s
    transition-timing-function ease
    transform translateX(100vw)
    background-color $darkGrey
    z-index 1000
    +sm()
      transform translateX(-100vw)
      right 67%
    &--active
        transform translateX(0)
  &__header
    display: flex
    align-items center
    padding-bottom 8px
    border-bottom 1px solid $base-border
    h3
      width 100%
      text-align center
  &__back-button
    display flex
    align-items center
    border none
    background-color transparent
    height 40px
    i
      font-size 24px
  &__close-button
    display flex
    align-items center
    margin-left auto
    border none
    background-color transparent
    height 40px
    padding 8px 16px
    i
      font-size 24px
  &__catalog-container
    overflow auto
  &__catalog
    padding 0 16px
    list-style none
  &__catalog-link
    display flex
    text-decoration none
    color $primary-text
    font-size 18px
    font-weight 400
    align-items center
    padding 16px 0
    border-bottom 1px solid $base-border
    i
      display block
      margin-left auto
  &__catalog-link-icon
    display block
    width 24px
    height 24px
    margin-right 16px
  .applogo
    width 144px
    height auto
    +sm()
      width 214px
</style>
