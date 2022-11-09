<template>
  <div>
    <header class="app-category__header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/catalog' }"
          >Каталог</el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-for="item in pagination"
          :key="item.slug"
          :to="slugPath != item.slug ? { path: `/catalog${item.slug}` } : null"
        >
          {{ item.path }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="app-category__sort-block">
        <small>сортировать по: цене</small>
        <button
          @click="sortByPrice"
          class="app-category__price-sort-icon"
          type="text"
        >
          <i v-show="priceSorting == 'inc'" class="el-icon-we-arrow-up"></i>
          <i v-show="priceSorting == 'desc'" class="el-icon-we-arrow-down"></i>
        </button>
        <el-select
          class="app-category__select"
          v-model="brand"
          multiple
          placeholder="Бренд"
          @change="changeBrand"
          @remove-tag="changeBrand"
        >
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          class="app-category__select"
          v-model="discount"
          placeholder="Варианты"
          @change="changeDiscount"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </header>
    <p v-if="$fetchState.pending">Загрузка...</p>
    <p v-else-if="$fetchState.error">Что-то пошло не так...</p>
    <AppProducts :products="products"></AppProducts>
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
import { mapGetters} from 'vuex'
export default {
  name: "catalog",
  data: () => ({
    path: "",
    products: [],
    brands: [],
    priceSorting: "desc",
    discount: "",
    brand: [],
    pageCount: 4,
    totalProducts: null,
    currentPage: 1,
    brandOptions: [],
    typeOptions: [
      {
        value: "discount",
        label: "Только со скидкой"
      },
      {
        value: "",
        label: "Все"
      }
    ]
  }),
  async fetch() {
    const { data: catalog } = await this.$axios.get(
      `${this.getApiUrl}/categories`
    );
    const category = this.findCategoryBySlugPath(
      this.slugPath,
      catalog.children
    );
    this.path = category?.path;
    const query = {};
    if (this.priceSorting) {
      query.sortBy = "price";
      query.orderBy = this.priceSorting;
    }
    if (this.brand) {
      query.brand = this.brand.join(",");
    }
    if (this.discount) {
      query.discount = true;
    }
    query.pageNumber = this.currentPage;
    query.pageSize = this.pageCount;
    const url = category
      ? `${this.getApiUrl}/products/category/${category._id}`
      : `${this.getApiUrl}/products`;
    const request = new URL(url);
    for (let [key, value] of Object.entries(query)) {
      request.searchParams.set(key, value);
    }
    const { data: fetchedProducts } = await this.$axios.get(request.toString());
    this.products = fetchedProducts.products;
    this.totalProducts = fetchedProducts.totalProducts;
    if (this.brandOptions.length === 0) {
      const { data: brands } = await this.$axios.get(
        `${this.getApiUrl}/brands`
      );

      const brandsMap = brands.reduce((acc, el) => {
        acc[el._id] = el.name;
        return acc;
      }, {});

      this.brandOptions = this.products
        .reduce((acc, elem) => {
          if (!acc.includes(elem.brand)) {
            acc.push(elem.brand);
          }
          return acc;
        }, [])
        .map(el => {
          return { value: el, label: brandsMap[el] };
        });
    }
  },
  methods: {
    changePagination() {
      this.$fetch();
    },
    changeBrand() {
      this.currentPage = 1;
      this.$fetch();
    },
    changeDiscount() {
      this.currentPage = 1;
      this.$fetch();
    },
    sortByPrice() {
      this.currentPage = 1;
      this.priceSorting = this.priceSorting === "desc" ? "inc" : "desc";
      this.$fetch();
    },
    findCategoryBySlugPath(slugPath, array = []) {
      return array.reduce((a, item) => {
        if (a) return a;
        if (item.slugPath === slugPath) return item;
        if (item.children)
          return this.findCategoryBySlugPath(slugPath, item.children);
      }, null);
    }
  },
  computed: {
    ...mapGetters('apiUrl', ['getApiUrl']),
    slugPath() {
      if (this.$route.path) {
        return this.$route.path
          .split("/")
          .filter(el => el.toLowerCase() !== "catalog")
          .join("/");
      }
    },

    pagination() {
      let currentSlug = "";
      if (this.slugPath) {
        return this.slugPath
          .split("/")
          .slice(1)
          .map((elem, index) => {
            currentSlug += "/" + elem;
            return {
              slug: currentSlug,
              path: this.path.split("/").slice(1)[index]
            };
          });
      }
    }
  },
  watch: {
    "$route.path": "$fetch"
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-category
  &__header
    margin-bottom 16px
  &__sort-block
    margin-top 16px
  &__price-sort-icon
    border none
    background transparent
    outline none
  &__select
    margin-top 16px
    +sm()
      margin-left 16px
.pagination-container
  display flex
  justify-content center
</style>
