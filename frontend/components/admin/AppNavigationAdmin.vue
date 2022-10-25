<template>
  <nav class="app-navigation-admin">
    <button
      @click="drawer = true"
      class="app-navigation-admin__menu-button"
      type="text"
    >
      <i class="el-icon-we-menu"></i>
    </button>
    <el-drawer
      class="app-navigation-admin__el-drawer"
      :size="viewportSize == 'xs' ? '100%' : '30%'"
      direction="ltr"
      :visible.sync="drawer"
    >
      <el-menu router :default-active="$route.path">
        <el-menu-item index="/admin">
          <i class="el-icon-we-trending-up"></i>
          <span>Аналитика</span>
        </el-menu-item>
        <el-menu-item index="/admin/orders">
          <i class="el-icon-we-shopping-cart"></i>
          <span>Заказы</span>
        </el-menu-item>
        <el-menu-item index="/admin/products">
          <i class="el-icon-we-tag"></i>
          <span>Продукты</span>
        </el-menu-item>
        <el-menu-item index="/admin/users/">
          <i class="el-icon-we-users"></i>
          <span>Пользователи</span>
        </el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="/admin/settings">
          <i class="el-icon-we-settings"></i>
          <span>Настройки</span>
        </el-menu-item>
        <el-menu-item index="/admin/logout">
          <i class="el-icon-we-log-out"></i>
          <span>Выход</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </nav>
</template>
<script>
import breakpointsMixin from "~/mixins/breakpoints.mixin";
export default {
  name: "AppNavigationAdmin",
  mixins: [breakpointsMixin],
  data: () => ({
    drawer: false,
    search: ""
  })
};
</script>

<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'

.app-navigation-admin
  &__menu-button
    padding 8px
    border none
    background-color transparent
    color white
    font-size 24px
</style>
