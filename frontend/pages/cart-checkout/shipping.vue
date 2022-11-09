<template>
  <client-only>
    <div>
      <el-row>
        <CheckoutSteps :active="1"></CheckoutSteps>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :sm="16" :md="10">
          <el-card>
            <h2>
              Адрес доставки
            </h2>
            <section class="mt-32 app-arrange-order">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="shippingForm"
                class="demo-ruleForm"
                @submit.prevent.native="submitForm"
              >
                <div>
                  <el-form-item label="доставка" prop="deliveryType">
                    <el-select
                      class="app-arrange-order__select"
                      v-model="ruleForm.deliveryType"
                      placeholder="Доставка"
                    >
                      <el-option
                        v-for="item in options.deliveryType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <small
                    style="display: block; padding: 0 8px 16px"
                    v-if="ruleForm.deliveryType == 'exw'"
                  >
                    <b>Адрес склада: </b>г.Город, ул.Улица, д.00
                    <br />
                    <b>Время работы: </b>8.00 - 18.00, Пн-Пт.
                  </small>
                  <div v-if="ruleForm.deliveryType == 'courier'">
                    <el-form-item label="страна" prop="country">
                      <el-input v-model.trim="ruleForm.country"></el-input>
                    </el-form-item>
                    <el-form-item label="город" prop="city">
                      <el-input v-model.trim="ruleForm.city"></el-input>
                    </el-form-item>
                    <el-form-item prop="address" label="адрес">
                      <el-input v-model.trim="ruleForm.address"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <el-form-item label="номер телефона" prop="phone">
                  <el-input
                    type="tel"
                    v-mask="'+7 (999) 999-9999'"
                    placeholder="+7 (___) ___-____"
                    v-model.trim="ruleForm.phone"
                  ></el-input>
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
        deliveryType: [
          {
            value: "courier",
            label: "Доставка курьером"
          },
          {
            value: "exw",
            label: "Самовывоз"
          }
        ]
      },
      ruleForm: {
        country: "Российская Федерация",
        city: "",
        address: "",
        phone: "",
        deliveryType: ""
      },
      rules: {
        country: [
          { required: true, message: "Введите страну", trigger: "blur" }
        ],
        city: [{ required: true, message: "Введите город", trigger: "blur" }],
        address: [
          { required: true, message: "Введите адрес", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "Введите номер телефона",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^((\+7)\s\([0-9]{3}\)\s[0-9]{3}-([0-9]){4})$/,
            message: "Номер телефона некорректный",
            trigger: "change"
          }
        ],
        deliveryType: [
          {
            required: true,
            message: "Выберите тип доставки",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("cart", ["saveAddressToCart"]),
    submitForm() {
      this.$refs.shippingForm.validate(valid => {
        if (valid) {
          const payload = {
            country: this.ruleForm?.country,
            city: this.ruleForm?.city,
            address: this.ruleForm?.address,
            phone: this.ruleForm.phone,
            deliveryType: this.ruleForm.deliveryType
          };
          this.saveAddressToCart(payload);
          this.$router.push("/cart-checkout/payment");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    ...mapGetters("cart", ["address"])
  },
  created() {
    this.ruleForm.country = this.address?.country
      ? this.address.country
      : this.ruleForm.country;
    this.ruleForm.city = this.address?.city;
    this.ruleForm.phone = this.address?.phone;
    this.ruleForm.deliveryType = this.address?.deliveryType;
    this.ruleForm.address = this.address?.address;
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
