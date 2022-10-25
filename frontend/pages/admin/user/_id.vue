<template>
  <div class="wrapper">
    <el-main>
      <div>
        <el-row :gutter="32">
          <el-col :md="8">
            <AppAdminUserInfo />
          </el-col>
          <el-col :md="16">
            <AppAdminUserOrders class="mt-24" />
          </el-col>
        </el-row>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  layout: "Admin",
  data() {
    return {
      search: ""
    };
  }
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
