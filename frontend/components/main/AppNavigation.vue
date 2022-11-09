<template>
  <nav class="appnavigation">
    <div class="appnavigation__main">
      <AppLogo class="applogo" />
      <div class="appnavigation__nav">
        <form
          class="appnavigation__search-form"
          @submit.prevent="handleSearch"
          action=""
        >
          <keep-alive>
            <el-input placeholder="Найти товар" v-model.trim="searchKeyword">
              <button
                class="appnavigation__search-button"
                slot="suffix"
                @click="handleSearch"
                type.native="submit"
                type="text"
              >
                <i class="el-input__icon el-icon-search"></i>
              </button>
            </el-input>
          </keep-alive>
        </form>
        <AppCatalogNav class="appnavigation__app-catalog-nav" />
      </div>
      <div class="appnavigation__contact">
        <a
          href="#"
          class="appnavigation__contact-button appnavigation__contact-button--phone"
          type="text"
        >
          <i class="el-icon-we-phone"></i>
          <span>+7 000 000 00 00</span>
        </a>
        <a href="#" class="appnavigation__contact-button" type="text">
          <i class="el-icon-we-telegram"></i>
        </a>
        <a href="#" class="appnavigation__contact-button" type="text">
          <i class="el-icon-we-whatsapp"></i>
        </a>
      </div>
      <client-only>
        <div class="appnavigation__user">
          <el-dropdown v-if="userInfo._id" trigger="click">
            <span class="appnavigation__user-dropdown-link-title">
              {{ userInfo.name }} <i class="el-icon-we-chevron-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-we-user">
                <NuxtLink
                  class="appnavigation__user-dropdown-link"
                  to="/user/profile"
                >
                  Личный кабинет
                </NuxtLink>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="userInfo && userInfo.isAdmin"
                icon="el-icon-we-grid"
              >
                <NuxtLink class="appnavigation__user-dropdown-link" to="/admin">
                  Панель администратора
                </NuxtLink>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-we-log-out">
                <span
                  class="appnavigation__user-dropdown-link"
                  @click="logoutHandler"
                >
                  Выйти
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <NuxtLink v-else to="/user/login">
            <span>Войти</span>
            <el-button class="appnavigation__user-button" type="text">
              <i class="el-icon-we-user"></i>
            </el-button>
          </NuxtLink>
          <NuxtLink to="/cart">
            <el-button class="appnavigation__user-button" type="text">
              <el-badge
                :hidden="cartItems.length === 0"
                :value="cartItems.length"
              >
                <i class="el-icon-we-shopping-cart"></i>
              </el-badge>
            </el-button>
          </NuxtLink>
        </div>
      </client-only>
    </div>
    <div class="appnavigation__links">
      <ul class="appnavigation__links-list">
        <li
          v-for="item in links"
          :key="item.name"
          class="appnavigation__links-item"
        >
          <NuxtLink class="appnavigation__link" :to="item.url">{{
            item.name
          }}</NuxtLink>
        </li>
      </ul>
    </div>
    <el-drawer
      class="appnavigation__el-drawer"
      :size="viewportSize == 'xs' ? '100%' : '40%'"
      :direction="viewportSize == 'xs' ? 'rtl' : 'ltr'"
      :visible.sync="drawer"
      :with-header="true"
    >
      <template v-slot:title>
        <h2>Каталог</h2>
      </template>
      <ul class="appnavigation__catalog">
        <li
          v-for="item in catalog"
          :key="item.name"
          class="appnavigation__catalog-item"
        >
          <a
            @click.prevent="item.isOpen = true"
            href="#"
            class="appnavigation__catalog-link"
          >
            <span
              :style="{ 'background-image': `url(${item.imgUrl})` }"
              class="appnavigation__catalog-link-icon"
            ></span>
            <span class="appnavigation__catalog-link-text">
              {{ item.name }}
            </span>
            <i class="el-icon-we-chevron-right"></i>
          </a>
        </li>
      </ul>
    </el-drawer>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import breakpointsMixin from "~/mixins/breakpoints.mixin";
export default {
  name: "AppNavigation",
  mixins: [breakpointsMixin],
  data: () => ({
    searchKeyword: null,
    drawer: false,
    links: [
      {
        name: "Ремонт часов",
        url: "/service"
      },
      {
        name: "Ремешки и браслеты",
        url: "/catalog/remeshki-i-braslety"
      },
      {
        name: "Батарейки",
        url: "/catalog/batareiki"
      },
      {
        name: "Зарядные устройства",
        url: "/catalog/zaryadnye-ustroistva"
      },
      {
        name: "Доставка и оплата",
        url: "/delivery-terms"
      },
      {
        name: "Фотогалерея",
        url: "/gallery"
      }
    ],
    catalog: {}
  }),
  methods: {
    ...mapActions("users", ["logout"]),
    handleSearch() {
      if (this.searchKeyword) {
        this.$router.push(`/search/${this.searchKeyword}`);
      } else {
        this.$router.push("/");
      }
    },
    logoutHandler() {
      this.logout();
      this.notify();
      this.$router.push("/");
    },
    notify() {
      if (this.message) {
        this.$notify({
          message: this.message,
          position: "bottom-right",
          type: "success"
        });
      }
      if (this.error) {
        this.$notify.error({
          message: this.error,
          position: "bottom-right"
        });
      }
    }
  },
  computed: {
    ...mapGetters("cart", ["cartItems"]),
    ...mapGetters("users", ["userInfo", "message", "error"])
  }
};
</script>

<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'


.appnavigation
  &__main
    display flex
    position relative
    box-sizing content-box
    padding-top 24px
    padding-bottom 50px
    justify-content space-between
    align-items center
    height 50px
    +sm()
      height 60px
      padding-top 0
    +md()
      padding-bottom 8px
  &__nav
    position absolute
    bottom 0
    display flex
    align-items center
    height 60px
    justify-content space-between
    width 100%
    +md()
      position static
      bottom auto
      margin 0 16px
  &__search-form
    width 100%
  &__search-button
    border none
    background-color transparent
  &__app-catalog-nav
    margin-left 16px
    +sm()
      margin-left 0
      margin-right 16px
      order -1
  &__contact
    position fixed
    top 0
    left 0
    right 0
    display: flex
    align-items center
    justify-content space-around
    height 24px
    background-color #003E21
    flex-shrink 0
    z-index 10
    +sm()
      background-color transparent
      position static
      top auto
      left auto
      right auto
      height auto

  &__contact-button
    text-decoration none
    color $primary
    padding 8px
    i
      font-size 16px
      color white
      opacity 0.5
      +sm()
        font-size 24px
        opacity 1
        color $primary-text
  &__contact-button--phone
    display flex
    align-items center
    vertical-align middle
    span
      display none
      +sm()
        display inline-block
        margin-left 8px
        font-size 20px
        font-family roboto
        font-weight 700
  &__user
    flex-shrink 0
    margin-left 24px
    a
      text-decoration none
    span
      font-size 14px
      font-family roboto
      font-weight 500
      color black
    i
      color black
      font-size 20px
  &__user-button
    vertical-align middle
    i
      color black
      font-size 20px
  &__user-dropdown-link-title
    i
      vertical-align middle
      font-size .8rem
      padding-right 8px
  &__user-dropdown-link
    text-decoration none
    color $secondary-text
  &__links
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
  &__links-list
    list-style: none
    display: flex;
  &__links-item
    flex-shrink 0
    background-color $primary
    padding 4px 16px
    border-radius 24px
    margin-right 16px
    &:last-child
      margin-right 0
    +sm()
      background-color transparent
      padding 0
  &__link
    color white
    font-weight 500
    text-decoration none
    font-size 14px
    line-height 22px
    +sm()
      color $primary-text
  &__el-drawer
    outline none!important
  &__catalog
    padding 0 16px
    list-style none
  &__catalog-link
    display flex
    text-decoration none
    color $primary-text
    font-size 18px
    font-weight 600
    align-items center
    padding 16px 0
    border-bottom 1px solid $base-border
    &::first-of-type
      border-top 1px solid $base-border
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
