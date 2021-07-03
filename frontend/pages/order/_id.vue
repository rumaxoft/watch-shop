<template>
  <client-only>
    <section class="order-details">
      <el-row
        v-loading="loading"
        type="flex"
        style="flex-wrap: wrap;"
        justify="center"
        :gutter="64"
      >
        <el-col :xs="24" :md="10">
          <el-card>
            <h3>Заказ №{{ fetchedOrder._id }}</h3>
            <el-divider></el-divider>
            <p>
              <strong>Имя:&nbsp; </strong>
              <span>
                {{ name }}
              </span>
            </p>
            <p>
              <strong>Email:&nbsp; </strong>
              <span>
                {{ email }}
              </span>
            </p>
            <el-divider></el-divider>
            <strong>Статус:&nbsp; </strong>
            <span>
              {{ status }}
            </span>
            <el-divider></el-divider>
            <p class="mb-16">
              <strong>Тип доставки:&nbsp; </strong>
              <span>
                {{ fetchedOrder.deliveryType }}
              </span>
            </p>
            <el-alert
              class="mt-16"
              :closable="false"
              :title="isDelivered ? 'Доставлен' : 'Не доставлен'"
              :type="isDelivered ? 'success' : 'error'"
            >
            </el-alert>
            <div v-if="fetchedOrder.deliveryType === 'Доставка курьером'">
              <b>Адрес доставки : &nbsp;</b>
              <span>
                {{ shippingAddress }}
              </span>
            </div>
            <el-divider></el-divider>
            <strong>Телефон для связи:&nbsp;</strong>
            <span>
              {{ fetchedOrder.phone }}
            </span>
            <el-divider></el-divider>
            <p class="mb-16">
              <strong>Оплата:&nbsp;</strong>
              <span>
                {{ fetchedOrder.paymentMethod }}
              </span>
            </p>
            <el-alert
              class="mt-16"
              :closable="false"
              :title="isPaid ? `Оплачен, ${orderPaidAt}` : 'Не оплачен'"
              :type="isPaid ? 'success' : 'error'"
            >
            </el-alert>
            <el-divider></el-divider>
            <h3>Товары:</h3>
            <!-- <div class="mt-16" v-if="fetchedOrder.cartItems.length === 0">
              Корзина пуста
            </div> -->
            <ul class="app-cart__products-list">
              <li
                v-for="item in fetchedOrder.orderItems"
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
              <p>{{ fetchedOrder.itemsPrice || "0" | currency }}</p>
            </div>
            <div class="app-cart__total-amount app-cart__total-amount--light ">
              <p>Доставка:</p>
              <p>{{ fetchedOrder.deliveryPrice || "0" | currency }}</p>
            </div>
            <el-divider></el-divider>
            <div class="app-cart__total-amount ">
              <p>Итого:</p>
              <p>{{ fetchedOrder.totalPrice || "0" | currency }}</p>
            </div>
            <el-alert v-show="this.error" :title="this.error" type="error">
            </el-alert>
            <div
              v-loading="loadingPay"
              v-if="
                !fetchedOrder.isPaid && fetchedOrder.paymentMethod === 'PayPal'
              "
            >
              <el-divider></el-divider>
              <component :is="payPalButton" v-bind="payPalProps"> </component>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </client-only>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Vue from "vue";
export default {
  name: "OrderDetails",
  validate({ params }) {
    const isVerified = params.id ? true : false;
    return isVerified;
  },
  data() {
    return {
      sdkReady: false,
      payPalButton: null,
      buttonLoading: false
    };
  },
  async fetch() {
    console.log("fetch");
    try {
      await this.getOrderDetails(this.$route.params.id);
      if (
        this.fetchedOrder.paymentMethod === "PayPal" &&
        !this.fetchedOrder.isPaid
      ) {
        await this.addPaypalScript();
      }
    } catch (error) {
      this.notify();
    }
  },
  fetchOnServer: false,
  fetchKey(getCounter) {
    return this.$route.params.id + "-" + getCounter("orderDetails");
  },
  methods: {
    ...mapActions("orders", ["getOrderDetails", "payOrder"]),
    ...mapMutations("orders", ["ORDER_PAY_RESET"]),
    async addPaypalScript() {
      const { data: clientId } = await this.$axios.get(
        "http://localhost:5050/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=RUB`;
      script.async = true;
      script.onload = () => {
        this.sdkReady = true;
        this.payPalButton = window.paypal.Buttons.driver("vue", Vue);
      };
      document.body.appendChild(script);
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
      if (this.alert) {
        this.$message({
          showClose: true,
          duration: 10000,
          message: this.alert,
          type: "success"
        });
      }
    }
  },
  created() {
    if (!this.userInfo._id) {
      this.$router.push("/user/login");
    }
  },
  watch: {
    successPay: async function(val) {
      if (val) {
        this.ORDER_PAY_RESET();
        await this.getOrderDetails(this.$route.params.id);
      }
    }
  },
  computed: {
    ...mapGetters("orders", [
      "fetchedOrder",
      "loading",
      "message",
      "error",
      "successPay",
      "loadingPay",
      "alert"
    ]),
    ...mapGetters("users", ["userInfo"]),
    shippingAddress() {
      return [
        this.fetchedOrder.shippingAddress?.country,
        this.fetchedOrder.shippingAddress?.city,
        this.fetchedOrder.shippingAddress?.address
      ].join(", ");
    },
    name() {
      return this.fetchedOrder?.user?.name || "";
    },
    email() {
      return this.fetchedOrder?.user?.email || "";
    },
    isPaid() {
      return this.fetchedOrder?.isPaid;
    },
    isDelivered() {
      return this.fetchedOrder?.isDelivered;
    },
    status() {
      return this.fetchedOrder?.status === "not approved"
        ? "Не подтвержден"
        : "Подтверджен";
    },
    payPalComponent() {
      return this.payPalButton || "";
    },
    payPalProps() {
      return {
        ["on-approve"]: this.onApprove,
        ["create-order"]: this.createOrder,
        ["env"]: "sandbox"
      };
    },
    createOrder: function() {
      return (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.fetchedOrder.totalPrice
              }
            }
          ]
        });
      };
    },
    onApprove: function() {
      return (data, actions) => {
        return actions.order.capture().then(async details => {
          // This function shows a otransaction success message to your buyer.
          await this.payOrder({
            orderId: this.fetchedOrder._id,
            paymentResult: details
          });
          this.notify();
        });
      };
    },
    orderPaidAt() {
      return new Intl.DateTimeFormat("ru-RU").format(
        new Date(this.fetchedOrder.paidAt)
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.order-details
  margin 0
  padding 0
  overflow  hidden
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
