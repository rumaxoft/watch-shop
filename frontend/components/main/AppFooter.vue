<template>
  <div class="app-footer">
    <nav class="app-footer__links">
      <ul class="app-footer__links-list">
        <li
          v-for="item in links"
          :key="item.name"
          class="app-footer__links-item"
        >
          <NuxtLink :to="item.url" class="app-footer__link">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="app-footer__logo-block">
      <AppLogo class="app-footer__app-logo" white />
      <div class="app-footer__social-block">
        <i class="el-icon-we-instagram app-footer__social-instagram"></i>
        <i class="el-icon-we-vk app-footer__social-vk"></i>
      </div>
      <p class="app-footer__copyright">
        © 2020 WATCH EXPERT
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          name: "О нас",
          url: "/about"
        },
        {
          name: "Доставка и оплата",
          url: "/delivery-terms"
        },
        {
          name: "Ремонт часов",
          url: "/service"
        },
        {
          name: "Фотогаллерея",
          url: "/gallery"
        }
      ]
    };
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-footer
  display flex
  flex-direction column
  align-items center
  background-color $primary
  padding 48px 0
  +sm()
    flex-direction row
    justify-content center
  &__links
    border-bottom 1px solid white
    +sm()
      border-bottom none
      border-left 1px solid white
      padding-left 32px
  &__links-list
    list-style none
  &__links-item
    text-align center
    margin-bottom 32px
    +sm()
      margin-bottom 0
      padding 16px 0
  &__link
    color white
    font-weight 500
    text-decoration none
  &__logo-block
    margin-top 32px
    +sm()
      order -1
      padding-right 32px
      margin-top 0
  &__app-logo
    width 234px
  &__social-block
    display flex
    justify-content center
    margin-top 32px
    i
      font-size 40px
      color white
      padding 0 16px
  &__copyright
    margin-top 32px
    color white
    font-size 12px
    text-align center
</style>
