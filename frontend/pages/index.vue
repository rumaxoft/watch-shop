<template>
  <div>
    <AppBanner :banners="promoBanners" />
    <h3 class="mt-16">
      Популярные товары
    </h3>
    <AppProducts class="mt-16" :products="products"></AppProducts>
    <AppBrands />
    <AppContacts />
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      promoBanners: [],
      products: []
    };
  },
  async fetch() {
    const { data: fetchedBanners } = await this.$axios.get(
      "http://localhost:5050/api/banners"
    );
    const { data: fetchedProducts } = await this.$axios.get(
      "http://localhost:5050/api/products/top"
    );
    this.promoBanners = fetchedBanners;
    this.products = fetchedProducts;
  }
};
</script>

<style lang="stylus"></style>
