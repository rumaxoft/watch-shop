<template>
  <header height="64px" class="appheader">
    <AppNavigationAdmin />
  </header>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.appheader
  display flex
  align-items center
  padding 0 16px
  background-color $primary
</style>
