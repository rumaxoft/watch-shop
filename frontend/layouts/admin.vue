<template>
  <el-container class="constrain">
    <nuxt />
  </el-container>
</template>
<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.constrain
  max-width 1500px
  margin 0 auto
  min-height 100%
</style>
