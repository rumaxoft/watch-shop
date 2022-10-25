<template>
  <div class="wrapper">
    <el-main>
      <div class="content-wrapper">
        <aside class="nav">
          <el-menu
            router
            :default-active="$route.path"
            style="border-right: none;"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="/admin/users/all">
              <i class="el-icon-we-folder"></i>
              <span>
                Все пользователи
              </span>
            </el-menu-item>
            <el-menu-item index="/admin/users/clients">
              <i class="el-icon-we-folder"></i>
              <span>
                Клиенты
              </span>
            </el-menu-item>
            <el-menu-item index="/admin/users/admins">
              <i class="el-icon-we-folder"></i>
              <span>
                Администраторы
              </span>
            </el-menu-item>
          </el-menu>
        </aside>
        <div class="content">
          <NuxtChild></NuxtChild>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  layout: "Admin",
  data() {
    return {};
  },
  created() {
    if (!this.$route.matched[1]) {
      this.$router.push("/admin/users/all");
    }
  },
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
.wrapper
  width 100%
  display flex
  flex-direction column
.content-wrapper
  height 100%
  +md()
    display flex
.nav
  width 100%
  flex-shrink 0
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.16);
  +md()
    width 280px
    height 100%
    margin-right 16px
.content
  overflow auto
  height 100%
  width 100%
  padding 24px
</style>
