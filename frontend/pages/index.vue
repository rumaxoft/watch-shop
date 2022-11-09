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
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "HomePage",
  data() {
    return {
      promoBanners: [],
      products: []
    };
  },
  computed: {
    ...mapGetters('apiUrl', ["getApiUrl"])
  },
  async fetch() {

    const { data: fetchedBanners } = await this.$axios.get(
      `${this.getApiUrl}/banners`
    );
    const { data: fetchedProducts } = await this.$axios.get(
      `${this.getApiUrl}/products/top`
    );
    this.promoBanners = fetchedBanners;
    this.products = fetchedProducts;
  }
};
</script>

<style lang="stylus"></style>
