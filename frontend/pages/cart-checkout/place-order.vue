<template>
  <client-only>
    <div v-loading="loading" style="overflow: hidden">
      <el-row>
        <CheckoutSteps :active="3"></CheckoutSteps>
      </el-row>
      <el-row
        type="flex"
        style="flex-wrap: wrap;"
        justify="center"
        :gutter="64"
      >
        <el-col :xs="24" :md="10">
          <el-card>
            <h2>
              Детали заказа
            </h2>
            <el-divider></el-divider>
            <strong>Тип доставки:&nbsp; </strong>
            <span>
              {{ deliveryTypeLabel }}
            </span>
            <el-divider></el-divider>
            <div v-if="address.deliveryType === 'exw'">
              <b>Адрес склада: </b>г.Краснодар, ул.Промышленная, д.49/2
              <br />
              <b>Время работы: </b>8.00 - 18.00, Пн-Пт.
            </div>
            <div v-if="address.deliveryType === 'courier'">
              <b>Адрес доставки : &nbsp;</b>
              <span>
                {{ shippingAddress }}
              </span>
            </div>
            <el-divider></el-divider>
            <strong>Телефон для связи:&nbsp;</strong>
            <span>
              {{ address.phone }}
            </span>
            <el-divider></el-divider>
            <strong>Оплата:&nbsp;</strong>
            <span>
              {{ paymentMethodLabel }}
            </span>
            <el-divider></el-divider>
            <h2>Товары в корзине:</h2>
            <div class="mt-16" v-if="cartItems.length === 0">
              Корзина пуста
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
                  <span>
                    {{ item.name }}
                  </span>
                </div>
                <span class="app-cart__product-price-count">
                  {{ item.qty }} x {{ item.price | currency }} =
                </span>
                <span class="app-cart__product-amount">
                  {{ (item.price * item.qty) | currency }}
                </span>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="6">
          <el-card class="mt-32">
            <div class="app-cart__total-amount app-cart__total-amount--light ">
              <p>Сумма:</p>
              <p>{{ totalAmount || "0" | currency }}</p>
            </div>
            <div class="app-cart__total-amount app-cart__total-amount--light ">
              <p>Доставка:</p>
              <p>{{ deliveryPrice || "0" | currency }}</p>
            </div>
            <el-divider></el-divider>
            <div class="app-cart__total-amount ">
              <p>Итого:</p>
              <p>{{ totalAmount + deliveryPrice || "0" | currency }}</p>
            </div>
            <el-button
              :disabled="cartItems.length === 0 || !userInfo._id"
              @click="placeOrderHandler"
              class="mt-32"
              type="primary"
            >
              Завершить оформление
            </el-button>
            <el-alert v-show="this.error" :title="this.error" type="error">
            </el-alert>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </client-only>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      options: {
        deliveryType: [
          {
            value: "courier",
            label: "Доставка курьером"
          },
          {
            value: "exw",
            label: "Самовывоз"
          }
        ],
        payment: [
          {
            value: "cash",
            label: "наличные при получении"
          },
          {
            value: "card",
            label: "карта при получении"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("orders", ["createOrder"]),
    ...mapActions("cart", ["resetCart"]),
    async placeOrderHandler() {
      try {
        const order = {
          orderItems: this.cartItems,
          shippingAddress: {
            address: this.address.address,
            city: this.address.city,
            country: this.address.country
          },
          deliveryPrice: this.deliveryPrice,
          deliveryType: this.deliveryTypeLabel,
          itemsPrice: this.totalAmount,
          totalPrice: this.deliveryPrice + this.totalAmount,
          phone: this.address.phone,
          paymentMethod: this.paymentMethodLabel
        };
        await this.createOrder(order);
        this.notify();
        this.resetCart();
        if (this.order._id) {
          this.$router.push(`/order/${this.order._id}`);
        }
      } catch (error) {
        this.notify();
      }
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
  },
  computed: {
    ...mapGetters("cart", ["address", "paymentMethod", "cartItems"]),
    ...mapGetters("orders", ["order", "loading", "message", "error"]),
    ...mapGetters("users", ["userInfo"]),
    deliveryTypeLabel() {
      const deliveryTypeObj = this.options.deliveryType.find(
        el => el.value === this.address.deliveryType
      );
      return deliveryTypeObj ? deliveryTypeObj.label : "";
    },
    paymentMethodLabel() {
      const paymentMethodObj = this.options.payment.find(
        el => el.value === this.paymentMethod
      );
      return paymentMethodObj ? paymentMethodObj.label : "";
    },
    totalAmount() {
      return this.cartItems.reduce((sum, current) => {
        return sum + current.qty * current.price;
      }, 0);
    },
    deliveryPrice() {
      return this.address.deliveryType === "exw" ? 0 : 500;
    },
    shippingAddress() {
      if (this.address.deliveryType === "courier") {
        return [
          this.address.country,
          this.address.city,
          this.address.address
        ].join(", ");
      } else {
        return "";
      }
    }
  },
  created() {}
};
</script>
<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-arrange-order
  padding 0
  &__select
    width 100%
  &__button-confirm
    margin-top 16px
.app-cart
  &__products-list
    list-style none
  &__products-item
    display flex
    align-items center
    padding 16px 0
  &__image-wrapper
    width 48px
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
  &__product-price-count
    white-space nowrap
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
    &--light
      font-weight 300
      padding 4px 16px
</style>
