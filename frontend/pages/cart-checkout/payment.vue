<template>
  <client-only>
    <div>
      <el-row>
        <CheckoutSteps :active="2"></CheckoutSteps>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :sm="16" :md="10">
          <el-card>
            <h2>
              Оплата
            </h2>
            <section class="mt-32 app-arrange-order">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="paymentForm"
                @submit.prevent.native="submitForm"
              >
                <el-form-item label="Выберите тип оплаты" prop="paymentMethod">
                  <el-select
                    class="app-arrange-order__select"
                    v-model="ruleForm.paymentMethod"
                  >
                    <el-option
                      v-for="item in options.paymentMethod"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="app-arrange-order__button-confirm"
                    type="primary"
                    native-type="submit"
                  >
                    Далее
                  </el-button>
                </el-form-item>
              </el-form>
            </section>
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
        paymentMethod: [
          {
            value: "card",
            label: "карта при получении"
          },
          {
            value: "cash",
            label: "наличные при получении"
          },
          {
            value: "paypal",
            label: "PayPal"
          }
        ]
      },
      ruleForm: {
        paymentMethod: ""
      },
      rules: {
        paymentMethod: [
          {
            required: true,
            message: "Выберите тип оплаты",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("cart", ["savePaymentMethodToCart"]),
    submitForm() {
      this.$refs.paymentForm.validate(valid => {
        if (valid) {
          const paymentMethod = this.ruleForm.paymentMethod;
          this.savePaymentMethodToCart(paymentMethod);
          this.$router.push("/cart-checkout/place-order");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    ...mapGetters("cart", ["address", "paymentMethod"])
  },
  created() {
    if (!this.address.deliveryType) {
      this.$router.push("/cart-checkout/shipping");
    }
    this.ruleForm.paymentMethod = this.paymentMethod ? this.paymentMethod : "";
  }
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
</style>
