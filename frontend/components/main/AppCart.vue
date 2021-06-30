<template>
  <client-only>
    <div style="overflow: hidden">
      <el-row>
        <CheckoutSteps :active="0"></CheckoutSteps>
      </el-row>
      <el-row
        type="flex"
        style="flex-wrap: wrap;"
        justify="center"
        :gutter="64"
      >
        <el-col :xs="24" :md="10">
          <h3>Товары в корзине:</h3>
          <section v-loading="loading">
            <div class="mt-32" v-if="cartItems.length === 0">
              В корзине нет товаров
            </div>
            <ul class="app-cart__products-list">
              <li
                v-for="item in cartItems"
                :key="item.product"
                class="app-cart__products-item"
              >
                <NuxtLink :to="`/product/${item.product}`">
                  <div class="app-cart__image-wrapper">
                    <div class="app-cart__image-container">
                      <el-image class="app-cart__image" lazy :src="item.image">
                      </el-image>
                    </div>
                  </div>
                </NuxtLink>
                <div class="app-cart__product-info">
                  <span class="app-cart__product-description">
                    {{ item.name }}
                  </span>
                  <el-select
                    class="app-cart__product-qty"
                    :value="item.qty"
                    placeholder="кол-во"
                    @change="updateCartItem($event, item.product)"
                  >
                    <el-option
                      v-for="item in item.countInStock"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <span class="app-cart__product-amount">
                  {{ (item.price * item.qty) | currency }}
                </span>
                <el-button
                  @click="removeCartItem(item.product)"
                  class="app-cart__product-delete"
                  type="text"
                >
                  <i class="el-icon-we-x"></i>
                </el-button>
              </li>
            </ul>
          </section>
        </el-col>
        <el-col :xs="24" :md="6">
          <el-card class="mt-32">
            <div class="app-cart__total-amount ">
              <p>Итого:</p>
              <p>{{ totalAmount || "0" | currency }}</p>
            </div>
            <el-button @click="handleCheckout" class="mt-32" type="primary">
              Оформить
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </client-only>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("cart", ["loading", "error", "message", "cartItems"]),
    ...mapGetters("users", ["userInfo"]),
    totalAmount() {
      return this.cartItems.reduce((sum, current) => {
        return sum + current.qty * current.price;
      }, 0);
    }
  },
  methods: {
    ...mapActions("cart", ["addToCart", "removeFromCart"]),
    async updateCartItem(e, id) {
      const payload = {
        productId: id,
        qty: Number(e)
      };
      await this.addToCart(payload);
      this.notify();
    },
    async removeCartItem(id) {
      const payload = {
        productId: id
      };
      await this.removeFromCart(payload);
      this.notify();
    },
    handleCheckout() {
      const redirect = this.userInfo?._id
        ? "/cart-checkout/shipping"
        : "/user/login?redirect=/cart-checkout/shipping";
      this.$router.push(redirect);
    },
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
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-cart
  &__products-list
    list-style none
  &__products-item
    display flex
    align-items center
    padding 16px 0
  &__image-wrapper
    width 80px
    flex-shrink 0
    margin-right 8px
  &__image-container
    width 100%
    padding-bottom 133.33%
    position relative
  &__image
    position absolute
    top 0
    bottom 0
    left 0
    right 0
  &__product-info
    margin-right 16px
  &__product-description
    margin-bottom 8px
    font-size 12px
    color $secondary-text
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow ellipsis
  &__product-qty
    width 80px
  &__product-amount
    margin-left auto
    margin-right 8px
  &__product-delete
    i
      font-size 24px
      color $primary-text
  &__total-amount
    padding 16px
    display flex
    justify-content space-between
    font-weight 500
</style>
