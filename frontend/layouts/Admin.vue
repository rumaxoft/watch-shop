<template>
  <el-container class="constrain">
    <div class="wrapper">
      <AppAdminHeader> </AppAdminHeader>
      <el-main>
        <nuxt />
      </el-main>
    </div>
  </el-container>
</template>
<script>
export default {
  beforeMount() {
    if (
      (this.$store.state.users.userInfo &&
        !this.$store.state.users.userInfo.isAdmin) ||
      !this.$store.state.users.userInfo
    ) {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.constrain
  max-width 1500px
  margin 0 auto
  min-height 100%
.wrapper
  width 100%
.search
  max-width 200px
  margin-left auto
</style>
