<template>
  <el-container class="constrain">
    <header class="appheader"><AppNavigation /></header>
    <el-main><Nuxt /></el-main>
    <el-footer height="auto" class="appfooter">
      <AppFooter />
    </el-footer>
  </el-container>
</template>
<script>
export default { name: "default" };
</script>

<style lang="stylus" scoped>
.constrain
  max-width 1500px
  margin 0 auto
  min-height 100%
.appheader
  padding 0 16px
.appfooter
  padding 0
</style>
