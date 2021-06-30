<template>
  <client-only>
    <div class="app-cart-page">
      <AppCart class="app-cart-page__app-cart" />
    </div>
  </client-only>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({}),
  methods: {
    ...mapActions("cart", ["addToCart"]),
    notify() {
      if (this.message) {
        this.$notify({
          message: this.message,
          position: "bottom-right",
          type: "success"
        });
      }
      if (this.error) {
        this.$notify.error({
          message: this.error,
          position: "bottom-right"
        });
      }
    }
  },
  computed: {
    ...mapGetters("cart", ["message", "error", "cartItems"])
  },
  async fetch() {
    if (!this.$route.params.id) return;
    await this.addToCart({
      productId: this.$route.params.id,
      qty: Number(this.$route.query.qty)
    });
    this.notify();
  },
  fetchKey(getCounter) {
    return this.$route.params.id + "-" + getCounter("product");
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
</style>
