<template>
  <el-header height="64px" class="appheader">
    <AppNavigationAdmin />
    <slot></slot>
  </el-header>
</template>
<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.appheader
  display flex
  align-items center
  padding 0 16px
  background-color $primary
</style>
