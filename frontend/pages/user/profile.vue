<template>
  <div>
    <el-row :gutter="32">
      <el-col :md="8">
        <AppUserInfo />
      </el-col>
      <el-col :md="16">
        <AppUserOrders class="mt-24" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  created() {
    if (!this.$store.state.users.userInfo._id) {
      this.$router.push("/user/login");
    }
  }
};
</script>
