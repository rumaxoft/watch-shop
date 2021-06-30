<template>
  <div class="wrapper">
    <AppAdminHeader>
      <el-input class="search" placeholder="Найти продукт" v-model="search">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </AppAdminHeader>
    <el-main>
      <div class="content-wrapper">
        <aside class="nav">
          <el-menu
            style="border-right: none;"
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-we-folder"></i>
                <span>Все категории</span>
              </template>
                <el-menu-item index="1-1">item one</el-menu-item>
              <el-submenu index="1-4">
                <template slot="title">item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span>Navigator Two</span>
            </el-menu-item>
          </el-menu>
        </aside>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis aliquam est aperiam earum perspiciatis neque aut voluptate fugit non ut, dolor quidem debitis aspernatur exercitationem nam libero consequatur officia corrupti!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi officia impedit voluptates, quisquam quaerat eligendi tempora sunt! Error provident quisquam soluta a laborum obcaecati nam autem omnis nisi. Cumque?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, iste distinctio eveniet laboriosam magnam incidunt nemo blanditiis ullam praesentium dolor maiores nobis quasi rerum qui ab! Debitis et quas deleniti.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum culpa reiciendis nemo beatae, totam minus, accusamus at magnam aperiam provident nisi quae tempore? Ad ratione autem dolorem natus nulla consectetur.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis aliquam est aperiam earum perspiciatis neque aut voluptate fugit non ut, dolor quidem debitis aspernatur exercitationem nam libero consequatur officia corrupti!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi officia impedit voluptates, quisquam quaerat eligendi tempora sunt! Error provident quisquam soluta a laborum obcaecati nam autem omnis nisi. Cumque?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, iste distinctio eveniet laboriosam magnam incidunt nemo blanditiis ullam praesentium dolor maiores nobis quasi rerum qui ab! Debitis et quas deleniti.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum culpa reiciendis nemo beatae, totam minus, accusamus at magnam aperiam provident nisi quae tempore? Ad ratione autem dolorem natus nulla consectetur.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis aliquam est aperiam earum perspiciatis neque aut voluptate fugit non ut, dolor quidem debitis aspernatur exercitationem nam libero consequatur officia corrupti!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi officia impedit voluptates, quisquam quaerat eligendi tempora sunt! Error provident quisquam soluta a laborum obcaecati nam autem omnis nisi. Cumque?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, iste distinctio eveniet laboriosam magnam incidunt nemo blanditiis ullam praesentium dolor maiores nobis quasi rerum qui ab! Debitis et quas deleniti.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum culpa reiciendis nemo beatae, totam minus, accusamus at magnam aperiam provident nisi quae tempore? Ad ratione autem dolorem natus nulla consectetur.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis aliquam est aperiam earum perspiciatis neque aut voluptate fugit non ut, dolor quidem debitis aspernatur exercitationem nam libero consequatur officia corrupti!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi officia impedit voluptates, quisquam quaerat eligendi tempora sunt! Error provident quisquam soluta a laborum obcaecati nam autem omnis nisi. Cumque?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, iste distinctio eveniet laboriosam magnam incidunt nemo blanditiis ullam praesentium dolor maiores nobis quasi rerum qui ab! Debitis et quas deleniti.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum culpa reiciendis nemo beatae, totam minus, accusamus at magnam aperiam provident nisi quae tempore? Ad ratione autem dolorem natus nulla consectetur.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis aliquam est aperiam earum perspiciatis neque aut voluptate fugit non ut, dolor quidem debitis aspernatur exercitationem nam libero consequatur officia corrupti!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi officia impedit voluptates, quisquam quaerat eligendi tempora sunt! Error provident quisquam soluta a laborum obcaecati nam autem omnis nisi. Cumque?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, iste distinctio eveniet laboriosam magnam incidunt nemo blanditiis ullam praesentium dolor maiores nobis quasi rerum qui ab! Debitis et quas deleniti.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum culpa reiciendis nemo beatae, totam minus, accusamus at magnam aperiam provident nisi quae tempore? Ad ratione autem dolorem natus nulla consectetur.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis aliquam est aperiam earum perspiciatis neque aut voluptate fugit non ut, dolor quidem debitis aspernatur exercitationem nam libero consequatur officia corrupti!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi officia impedit voluptates, quisquam quaerat eligendi tempora sunt! Error provident quisquam soluta a laborum obcaecati nam autem omnis nisi. Cumque?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, iste distinctio eveniet laboriosam magnam incidunt nemo blanditiis ullam praesentium dolor maiores nobis quasi rerum qui ab! Debitis et quas deleniti.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum culpa reiciendis nemo beatae, totam minus, accusamus at magnam aperiam provident nisi quae tempore? Ad ratione autem dolorem natus nulla consectetur.
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  layout: "admin",
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
.search
  max-width 200px
  margin-left auto
.content
  overflow auto
  height 100%
</style>
