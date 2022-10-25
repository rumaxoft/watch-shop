<template>
  <div class="wrapper">
    <AppAdminHeader>
      <el-input class="search" placeholder="Найти заказ" v-model="search">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </AppAdminHeader>
    <el-main>
      <AppAdminOrders />
    </el-main>
  </div>
</template>
<script>
export default {
  layout: "Admin"
};
</script>

<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.wrapper
  width 100%
.search
  max-width 200px
  margin-left auto
</style>
