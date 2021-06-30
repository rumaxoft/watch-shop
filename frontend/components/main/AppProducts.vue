<template>
  <div class="app-products">
    <div v-if="products.length === 0">
      Товаров нет
    </div>
    <el-row v-else class="app-products__row" :gutter="32">
      <el-col
        class="app-products__col"
        :xs="12"
        :sm="6"
        :md="4"
        :lg="4"
        :xl="4"
        v-for="(item, index) in products"
        :key="index"
        ><AppCard :item="item" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus">
.app-products
  &__title
    margin-top 32px
    margin-bottom 24px
  &__col
    margin-bottom 24px
</style>
