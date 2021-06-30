<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/catalog' }"
        >Результаты поиска</el-breadcrumb-item
      >
    </el-breadcrumb>
    <AppProducts class="mt-16" :products="products"></AppProducts>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :total="this.totalProducts"
        class="mt-16"
        :page-size="pageCount"
        :current-page.sync="currentPage"
        @current-change="changePagination"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      pageCount: 4,
      totalProducts: null,
      currentPage: 1
    };
  },
  methods: {
    changePagination() {
      this.$fetch();
    }
  },
  async fetch() {
    const query = {};
    if (this.$route.params.keyword) {
      query.keyword = encodeURIComponent(this.$route.params.keyword);
    }
    query.pageNumber = this.currentPage;
    query.pageSize = this.pageCount;
    const url = "http://localhost:5050/api/products";
    const request = new URL(url);
    for (let [key, value] of Object.entries(query)) {
      request.searchParams.set(key, value);
    }
    const { data: fetchedProducts } = await this.$axios.get(request.toString());
    this.products = fetchedProducts.products;
    this.totalProducts = fetchedProducts.totalProducts;
  }
};
</script>

<style lang="stylus">
.pagination-container
  display flex
  justify-content center
</style>
